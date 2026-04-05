import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { scrollGalleryAnchorIntoView } from '@/utils/scrollGalleryAnchor'

/**
 * React Router no aplica el scroll nativo al #fragmento en navegación cliente.
 * En la home, al entrar o cambiar el hash, desplaza al elemento con ese id.
 */
export function useGalleryHomeHashScroll() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (pathname !== appPaths.home) return
    if (!hash || hash.length <= 1) return
    let elementId: string
    try {
      elementId = decodeURIComponent(hash.slice(1))
    } catch {
      elementId = hash.slice(1)
    }
    if (!elementId) return
    scrollGalleryAnchorIntoView(elementId)
  }, [pathname, hash])
}
