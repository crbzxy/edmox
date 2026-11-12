/**
 * Metadatos por página (título, descripción, Open Graph, JSON-LD): una sola fuente para
 * - el cliente (`usePageMeta`), que los aplica al navegar, y
 * - el prerender del build (`scripts/postbuild-seo.mjs`), que los escribe en el HTML estático
 *   para buscadores y redes sociales que no ejecutan JS.
 *
 * Node importa este archivo directamente (type stripping): solo imports relativos con extensión `.ts`
 * o `import type`. Nada de `@/`, assets ni `import.meta`.
 */
import type { Specimen } from '@/data/specimens'
import { galleryCopy } from '../content/galleryCopy.ts'
import { appPaths } from '../constants/paths.ts'
import { DEFAULT_PAGE_DESCRIPTION, DEFAULT_PAGE_TITLE, SITE_NAME, SITE_URL } from '../constants/site.ts'
import { formatEdition, formatHeight, specimenImageAlt, splitSpecimenName } from '../services/specimens/format.ts'

export type PageMetaData = {
  title: string
  description: string
  /** Ruta relativa (p. ej. `/specimen/mox-001`). */
  path: string
  /** Imagen Open Graph (relativa o absoluta). JPG: WhatsApp/Facebook no leen AVIF. */
  image?: string
  imageAlt?: string
  /** Objeto schema.org que se inserta como JSON-LD. */
  jsonLd?: Record<string, unknown>
  /** Añade `<meta name="robots" content="noindex">` (404, piezas inexistentes). */
  noindex?: boolean
}

/** Campos de la pieza que necesitan los metadatos (sirve tanto con `Specimen` como con la entrada cruda del JSON). */
export type SpecimenMetaSource = Pick<
  Specimen,
  'id' | 'name' | 'artist' | 'year' | 'material' | 'description' | 'height' | 'origin' | 'edition'
>

/** Tamaño de las imágenes Open Graph que genera el build (las mismas medidas que `public/og-image.jpg`). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const

/** Imagen Open Graph de una pieza: JPG generado en el build en `dist/og/<id>.jpg`. */
export const specimenOgImagePath = (id: string) => `/og/${encodeURIComponent(id)}.jpg`

export const absoluteUrl = (url: string) =>
  /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`

const META_DESCRIPTION_MAX = 155

function truncateDescription(text: string) {
  return text.length <= META_DESCRIPTION_MAX
    ? text
    : `${text.slice(0, META_DESCRIPTION_MAX - 3).replace(/\s+\S*$/, '')}…`
}

export function homePageMeta(): PageMetaData {
  return { title: DEFAULT_PAGE_TITLE, description: DEFAULT_PAGE_DESCRIPTION, path: appPaths.home }
}

export function linksPageMeta(): PageMetaData {
  const { links } = galleryCopy
  return { title: `${links.pageTitle} · ${SITE_NAME}`, description: links.metaDescription, path: appPaths.links }
}

export function notFoundPageMeta(path: string = '/404'): PageMetaData {
  const { notFound } = galleryCopy
  return { title: `${notFound.title} · ${SITE_NAME}`, description: notFound.description, path, noindex: true }
}

export function specimenPageMeta(specimen: SpecimenMetaSource): PageMetaData {
  const { title, variant } = splitSpecimenName(specimen.name)
  const path = appPaths.specimenDetail(specimen.id)
  const image = specimenOgImagePath(specimen.id)
  const height = formatHeight(specimen.height)
  const edition = formatEdition(specimen.edition)

  return {
    title: `${title}${variant ? ` ${variant}` : ''} · Art toy de ${SITE_NAME}`,
    description: truncateDescription(specimen.description),
    path,
    image,
    imageAlt: specimenImageAlt(specimen),
    // Sin precios públicos, `Product` sin `offers` no valida en Google; `VisualArtwork` describe mejor una pieza de autor.
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name: specimen.name,
      url: absoluteUrl(path),
      image: absoluteUrl(image),
      description: specimen.description,
      artform: 'Art toy',
      artMedium: specimen.material,
      dateCreated: String(specimen.year),
      creator: { '@type': 'Organization', name: specimen.artist },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      ...(height ? { height } : {}),
      ...(edition ? { artEdition: edition } : {}),
      ...(specimen.origin ? { locationCreated: { '@type': 'Place', name: specimen.origin } } : {}),
    },
  }
}
