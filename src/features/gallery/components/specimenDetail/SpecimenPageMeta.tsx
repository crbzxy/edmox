import { appPaths } from '@/constants/paths'
import { SITE_NAME, SITE_URL } from '@/constants/site'
import type { Specimen } from '@/data/specimens'
import { usePageMeta } from '@/hooks/usePageMeta'
import { splitSpecimenName } from '@/services/specimens/catalog'

function buildDescription(specimen: Specimen) {
  const text = specimen.description
  return text.length <= 155 ? text : `${text.slice(0, 152).replace(/\s+\S*$/, '')}…`
}

/** Metadatos SEO de la ficha: título, descripción, canonical, Open Graph y JSON-LD de producto. */
export function SpecimenPageMeta({ specimen }: { specimen: Specimen }) {
  const { title, variant } = splitSpecimenName(specimen.name)
  const pageTitle = `${title}${variant ? ` ${variant}` : ''} · Art toy de ${SITE_NAME}`
  const path = appPaths.specimenDetail(specimen.id)

  usePageMeta({
    title: pageTitle,
    description: buildDescription(specimen),
    path,
    image: specimen.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: specimen.name,
      sku: specimen.id,
      url: `${SITE_URL}${path}`,
      image: specimen.image.startsWith('http') ? specimen.image : `${SITE_URL}${specimen.image}`,
      description: specimen.description,
      material: specimen.material,
      brand: { '@type': 'Brand', name: SITE_NAME },
      creator: { '@type': 'Organization', name: specimen.artist },
      ...(specimen.height ? { height: specimen.height } : {}),
    },
  })

  return null
}
