// Genera public/sitemap.xml y public/robots.txt a partir del catálogo. Corre antes de cada build.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteTs = fs.readFileSync(path.join(rootDir, 'src', 'constants', 'site.ts'), 'utf-8')
const siteUrl = /SITE_URL = '([^']+)'/.exec(siteTs)?.[1]
if (!siteUrl) throw new Error('No se encontró SITE_URL en src/constants/site.ts')

const specimens = JSON.parse(fs.readFileSync(path.join(rootDir, 'src', 'data', 'specimens.json'), 'utf-8'))
const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: `${siteUrl}/`, priority: '1.0' },
  { loc: `${siteUrl}/sitios-de-interes`, priority: '0.5' },
  ...specimens.map((s) => ({ loc: `${siteUrl}/specimen/${encodeURIComponent(s.id)}`, priority: '0.8' })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(rootDir, 'public', 'robots.txt'), robots)
console.log(`SEO: sitemap.xml (${urls.length} URLs) y robots.txt generados para ${siteUrl}`)
