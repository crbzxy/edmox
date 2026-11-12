import { useEffect } from 'react'
import { DEFAULT_PAGE_DESCRIPTION, DEFAULT_PAGE_TITLE, SITE_URL } from '@/constants/site'

type PageMeta = {
  title: string
  description: string
  /** Ruta relativa (p. ej. `/specimen/mox-001`). */
  path: string
  /** URL de imagen (relativa o absoluta) para Open Graph. */
  image?: string
  /** Objeto schema.org que se inserta como JSON-LD mientras la página está montada. */
  jsonLd?: Record<string, unknown>
}

const absolute = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`)

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector)
  if (!el) return undefined
  const previous = el.getAttribute(attr) ?? ''
  el.setAttribute(attr, value)
  return () => el.setAttribute(attr, previous)
}

/**
 * Actualiza título, descripción, canonical y Open Graph de la página (las etiquetas base viven en index.html)
 * y los restaura al desmontar. Google ejecuta JS y lee estos valores; redes sociales solo ven los de index.html.
 */
export function usePageMeta({ title, description, path, image, jsonLd }: PageMeta) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : undefined

  useEffect(() => {
    const url = absolute(path)
    const previousTitle = document.title
    document.title = title

    const restores = [
      setMeta('meta[name="description"]', 'content', description),
      setMeta('link[rel="canonical"]', 'href', url),
      setMeta('meta[property="og:title"]', 'content', title),
      setMeta('meta[property="og:description"]', 'content', description),
      setMeta('meta[property="og:url"]', 'content', url),
      image ? setMeta('meta[property="og:image"]', 'content', absolute(image)) : undefined,
    ]

    let script: HTMLScriptElement | undefined
    if (jsonLdText) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = jsonLdText
      document.head.appendChild(script)
    }

    return () => {
      document.title = previousTitle || DEFAULT_PAGE_TITLE
      restores.forEach((restore) => restore?.())
      script?.remove()
    }
  }, [title, description, path, image, jsonLdText])
}

export { DEFAULT_PAGE_DESCRIPTION, DEFAULT_PAGE_TITLE }
