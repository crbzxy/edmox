/**
 * Google Tag Manager.
 *
 * - Se carga desde este módulo (no con un <script> inline en index.html) para que la CSP pueda seguir
 *   sin 'unsafe-inline'. Los dominios de Google permitidos están en netlify.toml.
 * - Solo en el dominio de producción: deploy previews de Netlify y localhost no ensucian los datos.
 *   Para depurar en otro host, abrir la URL con `?gtm_debug=x` (lo añade Tag Assistant).
 * - Es una SPA: la carga inicial la cubre el evento estándar `gtm.js` (activador "All Pages");
 *   cada navegación posterior envía `virtual_page_view` (ver `trackPageView`).
 */
import { GTM_ID, SITE_URL } from '@/constants/site'

type DataLayerEvent = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
  }
}

const PRODUCTION_HOSTS = new Set([new URL(SITE_URL).hostname, `www.${new URL(SITE_URL).hostname}`])

function isEnabled() {
  if (typeof window === 'undefined') return false
  return PRODUCTION_HOSTS.has(window.location.hostname) || new URLSearchParams(window.location.search).has('gtm_debug')
}

let initialized = false

/** Inicializa el dataLayer y carga el contenedor de GTM (snippet oficial, sin inline). */
export function initGtm() {
  if (initialized || !isEnabled()) return
  initialized = true
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
  document.head.appendChild(script)
}

let isFirstPageView = true

/**
 * Página vista en navegación cliente. Se llama después de actualizar el título (usePageMeta),
 * así `page_title` nunca queda con el de la página anterior. La primera vista se omite:
 * ya la cuenta el evento `gtm.js` de la carga inicial.
 */
export function trackPageView(page: { path: string; title: string }) {
  if (isFirstPageView) {
    isFirstPageView = false
    return
  }
  if (!initialized) return
  window.dataLayer?.push({
    event: 'virtual_page_view',
    page_path: page.path,
    page_location: window.location.href,
    page_title: page.title,
  })
}
