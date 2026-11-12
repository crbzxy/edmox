import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fuentes servidas desde el propio sitio (sin conexión a Google Fonts ni bloqueo de render externo).
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import { initGtm } from './analytics/gtm'
import App from './App.tsx'

initGtm()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
