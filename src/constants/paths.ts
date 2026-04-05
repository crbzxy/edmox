/** Rutas públicas de la app: un solo lugar para evitar strings mágicos en enlaces y en el router. */
const specimenSegment = 'specimen' as const

export const appPaths = {
  home: '/',
  specimenSegment,
  specimenDetail: (specimenId: string) => `/${specimenSegment}/${encodeURIComponent(specimenId)}`,
} as const

export function isGalleryArchivePath(pathname: string) {
  return pathname === appPaths.home || pathname.startsWith(`/${appPaths.specimenSegment}/`)
}
