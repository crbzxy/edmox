/** Desplaza a un id de ancla respetando `prefers-reduced-motion`. La sección debe tener `scroll-margin-top` si hay barra fija. */
export function scrollGalleryAnchorIntoView(elementId: string) {
  const el = document.getElementById(elementId)
  if (!el) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}
