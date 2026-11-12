import type { Specimen } from '@/data/specimens'
import { usePageMeta } from '@/hooks/usePageMeta'
import { specimenPageMeta } from '@/seo/pageMeta'

/** Metadatos SEO de la ficha (mismos que escribe el prerender del build). */
export function SpecimenPageMeta({ specimen }: { specimen: Specimen }) {
  usePageMeta(specimenPageMeta(specimen))
  return null
}
