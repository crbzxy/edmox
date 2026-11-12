import type { ArchiveStatusFilter } from '@/content/galleryCopy'
import { specimens } from '@/data/specimens'
import type { Specimen } from '@/data/specimens'

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

/** `mox-001` → `Nº 001`. */
export function formatCatalogNumber(id: string): string {
  const match = /(\d+)$/.exec(id)
  return `Nº ${match ? match[1] : id.toUpperCase()}`
}

/** `CHUPALINAS / Edición GID` → `{ title: 'CHUPALINAS', variant: 'Edición GID' }`. */
export function splitSpecimenName(name: string): { title: string; variant?: string } {
  const [title, ...rest] = name.split(' / ')
  const variant = rest.join(' / ').trim()
  return { title: title.trim(), variant: variant || undefined }
}

/** `30` → `Ed. de 30`; textos libres se respetan. */
export function formatEdition(edition: string | undefined): string | undefined {
  if (!edition) return undefined
  return /^\d+$/.test(edition.trim()) ? `Ed. de ${edition.trim()}` : edition
}

/** `14cm` → `14 cm`. */
export function formatHeight(height: string | undefined): string | undefined {
  return height?.replace(/(\d)\s*cm$/i, '$1 cm')
}

/** Texto alternativo descriptivo para la foto de una pieza (accesibilidad + búsqueda de imágenes). */
export function specimenImageAlt(specimen: Specimen): string {
  const place = specimen.origin ? `, hecho en ${specimen.origin.split(',').slice(0, 2).join(',')}` : ''
  return `${specimen.name}: art toy de ${specimen.artist} en ${specimen.material.toLowerCase()}${place}`
}
