import type { ArchiveStatusFilter } from '@/content/galleryCopy'
import { specimens } from '@/data/specimens'
import type { Specimen } from '@/data/specimens'

export { formatCatalogNumber, formatEdition, formatHeight, specimenImageAlt, splitSpecimenName } from './format'

/**
 * Capa de lectura del catálogo (hoy datos estáticos; mañana puede delegar en API).
 */
export function findSpecimenById(id: string | undefined): Specimen | undefined {
  if (!id) return undefined
  return specimens.find((item) => item.id === id)
}

export function getSpecimensByStatusFilter(status: ArchiveStatusFilter): Specimen[] {
  if (status === 'all') return [...specimens]
  return specimens.filter((item) => item.status === status)
}

export function countSpecimensByStatusFilter(status: ArchiveStatusFilter): number {
  return getSpecimensByStatusFilter(status).length
}

/** Piezas vecinas en el orden del archivo (para navegar desde la ficha). */
export function getAdjacentSpecimens(id: string): { previous?: Specimen; next?: Specimen } {
  const index = specimens.findIndex((item) => item.id === id)
  if (index === -1) return {}
  return { previous: specimens[index - 1], next: specimens[index + 1] }
}
