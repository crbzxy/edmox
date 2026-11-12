# EDMOX: convenciones del proyecto

Sitio de Ediciones Mox (art toys hechos a mano en CDMX). React 19 + TypeScript + Vite + MUI 6, desplegado en Netlify.
Este archivo es el estándar del repo: aplica a personas y a agentes por igual.

## Comandos

| Comando                      | Qué hace                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| `npm run dev`                | Servidor de desarrollo                                                   |
| `npm run check`              | Lint + typecheck + validación del catálogo (correr antes de cada commit) |
| `npm run build`              | Valida catálogo, genera sitemap/robots, typecheck y build de producción  |
| `npm run format`             | Formatea con Prettier                                                    |
| `npm run optimize:specimens` | Genera variantes AVIF/WebP y `manifest.json` de las piezas               |

CI (`.github/workflows/ci.yml`) corre lint, typecheck, validación y build en cada PR. Node 24 (`.nvmrc`).

## Estructura

```
src/
  components/       Componentes genéricos, sin conocimiento del catálogo
  constants/        Rutas (paths.ts), sitio/SEO (site.ts), medidas de layout
  content/          Todo el texto visible (galleryCopy.ts)
  data/             Datos estáticos: specimens.json, events.ts, imágenes responsivas
  features/gallery/ Páginas, layout y componentes de la galería
  hooks/            Hooks reutilizables (usePageMeta, scroll, etc.)
  services/         Lectura y formato del catálogo (catalog.ts)
  theme/            Tokens de color y tema MUI
scripts/            Scripts de Node (SEO, validación, optimización de imágenes)
```

Alias de import: `@/` apunta a `src/`. Usarlo siempre en vez de rutas relativas largas (`../../`).

## Reglas

1. **Textos**: todo texto visible y todo `aria-label` vive en `src/content/galleryCopy.ts`. Nada de strings de UI dentro de los componentes.
2. **Colores**: desde el tema (`text.primary`, `primary.main`, …) o `brandPalette` de `src/theme/appColorTokens.ts`. ESLint bloquea hex sueltos en `.tsx`.
3. **Rutas**: solo vía `appPaths` (`src/constants/paths.ts`). Si se agrega una ruta, actualizar también `scripts/generate-seo-files.mjs`.
4. **Datos, no condicionales por id**: si una pieza o evento necesita un comportamiento distinto (etiqueta, tamaño, badge), se agrega un campo al dato. Nunca `if (specimen.id === 'mox-0XX')`.
5. **Lógica del catálogo** (filtrar, formatear, ordenar) va en `src/services/specimens/catalog.ts` como funciones puras, no dentro de componentes.
6. **Imágenes**: toda imagen de contenido pasa por el pipeline responsivo (`responsiveImage()`) con `width`/`height` y `sizes`. Las imágenes de piezas usan `ProtectedImage`.
7. **SEO por página**: cada página llama a `usePageMeta` con título, descripción y `path`.
8. **Accesibilidad**: `eslint-plugin-jsx-a11y` está activo. Objetivos táctiles de al menos 44px, `alt` descriptivo y animaciones condicionadas a `prefers-reduced-motion`.
9. **Formato**: Prettier (`.prettierrc.json`) + `.editorconfig`. Finales de línea LF (`.gitattributes`).

## Agregar una pieza al catálogo

1. Copiar la foto a `src/assets/specimens/mox-0XX.webp`.
2. `npm run optimize:specimens` (genera variantes en `src/assets/optimized/` y actualiza `manifest.json`).
3. Agregar la entrada en `src/data/specimens.json` (`id` con formato `mox-001`; `status`: `available` | `sold` | `pre-order`).
4. `npm run check`. El sitemap se regenera solo en el build.

## Git

- Ramas: `feat/…`, `fix/…`, `chore/…`, `content/…`, `perf/…`, `improve/…`.
- Commits en formato Conventional Commits: `feat:`, `fix:`, `perf:`, `style:`, `content:`, `chore:`, `docs:`.
- No commitear `dist/`, `reports/`, `_ref-gallery/` ni originales sin procesar.
