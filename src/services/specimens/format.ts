/**
 * Formato de datos de piezas: funciones puras, sin acceso al catálogo ni a assets.
 * Se comparten con los scripts de Node (prerender SEO), por eso solo importan tipos o rutas relativas `.ts`.
 */
import type { Specimen } from '@/data/specimens'

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
export function specimenImageAlt(specimen: Pick<Specimen, 'name' | 'artist' | 'material' | 'origin'>): string {
  const place = specimen.origin ? `, hecho en ${specimen.origin.split(',').slice(0, 2).join(',')}` : ''
  return `${specimen.name}: art toy de ${specimen.artist} en ${specimen.material.toLowerCase()}${place}`
}
