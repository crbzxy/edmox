import type { ArchiveMaterialFilter } from '@/content/galleryCopy'
import { specimens } from '@/data/specimens'
import type { Specimen } from '@/data/specimens'

/**
 * Capa de lectura del catálogo (hoy datos estáticos; mañana puede delegar en API).
 */
export function findSpecimenById(id: string | undefined): Specimen | undefined {
  if (!id) return undefined
  return specimens.find((item) => item.id === id)
}

export function getSpecimensByArchiveFilter(material: ArchiveMaterialFilter): Specimen[] {
  if (material === 'All') {
    return [...specimens]
  }
  return specimens.filter((item) => item.material === material)
}
