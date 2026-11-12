// Post-build SEO: corre después de `vite build` sobre `dist/`.
// 1. Prerender del <head>: un HTML por ruta con título, descripción, canonical, Open Graph y JSON-LD propios,
//    para buscadores y redes sociales que no ejecutan JS. El <body> sigue siendo la SPA.
// 2. Imágenes Open Graph JPG 1200×630 por pieza (WhatsApp/Facebook no leen AVIF).
// 3. sitemap.xml (lastmod real desde git) y robots.txt.
// 4. 404.html con noindex; Netlify lo sirve con status 404 para cualquier ruta sin HTML (public/_redirects).
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { appPaths } from '../src/constants/paths.ts'
import { SITE_URL } from '../src/constants/site.ts'
import {
  absoluteUrl,
  homePageMeta,
  linksPageMeta,
  notFoundPageMeta,
  OG_IMAGE_SIZE,
  specimenOgImagePath,
  specimenPageMeta,
} from '../src/seo/pageMeta.ts'
import { galleryCopy } from '../src/content/galleryCopy.ts'
import { brandPalette } from '../src/theme/appColorTokens.ts'

const rootDir = path.resolve(import.meta.dirname, '..')
const distDir = path.join(rootDir, 'dist')
const templatePath = path.join(distDir, 'index.html')
const specimens = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/specimens.json'), 'utf-8'))

if (!fs.existsSync(templatePath)) throw new Error('No existe dist/index.html: corre `vite build` antes.')
const template = fs.readFileSync(templatePath, 'utf-8')

// ---------- HTML ----------

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Reemplaza el atributo de una etiqueta existente; falla si no la encuentra (evita prerender silenciosamente roto). */
function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Prerender: no se encontró ${label} en dist/index.html`)
  return html.replace(pattern, replacement)
}

const metaTag = (attr, key) => new RegExp(`<meta\\s+${attr}="${key.replace(/[:]/g, '\\$&')}"\\s+content="[^"]*"\\s*/?>`)

function renderPage(meta) {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image ?? '/og-image.jpg')
  const imageAlt = meta.imageAlt ?? galleryCopy.hero.featuredImageAlt
  let html = template
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`, '<title>')
  const metas = [
    ['name', 'description', meta.description],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:width', OG_IMAGE_SIZE.width],
    ['property', 'og:image:height', OG_IMAGE_SIZE.height],
    ['property', 'og:image:alt', imageAlt],
  ]
  for (const [attr, key, value] of metas) {
    html = replaceTag(html, metaTag(attr, key), `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`, key)
  }
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    'canonical',
  )

  // Una página noindex no declara canonical (apuntaría a una URL que no existe).
  if (meta.noindex) html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/, '')

  const extraHead = []
  if (meta.noindex) extraHead.push('<meta name="robots" content="noindex" />')
  if (meta.jsonLd) {
    // `<` escapado para que el JSON nunca cierre el <script>.
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')
    extraHead.push(`<script type="application/ld+json" data-page-jsonld>${json}</script>`)
  }
  return extraHead.length ? html.replace('</head>', `    ${extraHead.join('\n    ')}\n  </head>`) : html
}

/** `/specimen/mox-001` → `dist/specimen/mox-001.html` (Netlify sirve `/x` desde `x.html`, sin redirigir a `/x/`). */
function writeRoute(routePath, meta) {
  const file = routePath === '/' ? 'index.html' : `${decodeURIComponent(routePath.replace(/^\//, ''))}.html`
  const target = path.join(distDir, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, renderPage(meta))
  return file
}

const pages = [
  { path: appPaths.home, meta: homePageMeta(), sources: ['src/data/specimens.json', 'src/content/galleryCopy.ts'] },
  { path: appPaths.links, meta: linksPageMeta(), sources: ['src/content/galleryCopy.ts'] },
  ...specimens.map((specimen) => ({
    path: appPaths.specimenDetail(specimen.id),
    meta: specimenPageMeta(specimen),
    sources: ['src/data/specimens.json', `src/assets/specimens/${specimen.imageFile}`],
  })),
]

for (const page of pages) writeRoute(page.path, page.meta)
fs.writeFileSync(path.join(distDir, '404.html'), renderPage(notFoundPageMeta()))

// ---------- Imágenes Open Graph ----------

fs.mkdirSync(path.join(distDir, 'og'), { recursive: true })
await Promise.all(
  specimens.map((specimen) =>
    sharp(path.join(rootDir, 'src/assets/specimens', specimen.imageFile))
      .rotate()
      .resize({ ...OG_IMAGE_SIZE, fit: 'contain', background: brandPalette.paper })
      .flatten({ background: brandPalette.paper })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(distDir, specimenOgImagePath(specimen.id).replace(/^\//, ''))),
  ),
)

// ---------- sitemap.xml y robots.txt ----------

/** Fecha (YYYY-MM-DD) del último commit que tocó alguna fuente de la página; `undefined` si no hay git. */
function lastCommitDate(sources) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined
  } catch {
    return undefined
  }
}

const urlEntries = pages.map((page) => {
  const lastmod = lastCommitDate(page.sources)
  return `  <url><loc>${escapeHtml(absoluteUrl(page.path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
})
fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(
  `SEO: ${pages.length} páginas prerenderizadas + 404.html, ${specimens.length} imágenes OG, sitemap.xml y robots.txt.`,
)
