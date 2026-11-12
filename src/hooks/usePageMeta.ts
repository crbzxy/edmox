import { useEffect } from 'react'
import { galleryCopy } from '@/content/galleryCopy'
import { absoluteUrl, OG_IMAGE_SIZE, type PageMetaData } from '@/seo/pageMeta'

/** Imagen Open Graph general (la misma que declara index.html). */
const DEFAULT_OG_IMAGE = '/og-image.jpg'

/** Marca el JSON-LD propio de la página, tanto el que escribe el prerender como el del cliente. */
const PAGE_JSON_LD_SELECTOR = 'script[type="application/ld+json"][data-page-jsonld]'

function setAttr(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/**
 * Aplica título, descripción, canonical, Open Graph, robots y JSON-LD de la página.
 * Cada página fija todos los valores (no se "restaura" al desmontar): así navegar desde un HTML
 * prerenderizado (ver scripts/postbuild-seo.mjs) nunca deja metadatos de otra página.
 */
export function usePageMeta(meta: PageMetaData) {
  const { title, description, path, noindex } = meta
  const image = meta.image ?? DEFAULT_OG_IMAGE
  const imageAlt = meta.imageAlt ?? galleryCopy.hero.featuredImageAlt
  const jsonLdText = meta.jsonLd ? JSON.stringify(meta.jsonLd) : undefined

  useEffect(() => {
    const url = absoluteUrl(path)
    document.title = title
    setAttr('meta[name="description"]', 'content', description)
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:title"]', 'content', title)
    setAttr('meta[property="og:description"]', 'content', description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('meta[property="og:image"]', 'content', absoluteUrl(image))
    setAttr('meta[property="og:image:width"]', 'content', String(OG_IMAGE_SIZE.width))
    setAttr('meta[property="og:image:height"]', 'content', String(OG_IMAGE_SIZE.height))
    setAttr('meta[property="og:image:alt"]', 'content', imageAlt)

    document.head.querySelectorAll(PAGE_JSON_LD_SELECTOR).forEach((node) => node.remove())
    let script: HTMLScriptElement | undefined
    if (jsonLdText) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.pageJsonld = ''
      script.text = jsonLdText
      document.head.appendChild(script)
    }

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (noindex && !robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex'
      document.head.appendChild(robots)
    } else if (!noindex) {
      robots?.remove()
    }

    return () => {
      script?.remove()
    }
  }, [title, description, path, image, imageAlt, jsonLdText, noindex])
}
