# EDMOX: convenciones del proyecto

Sitio de Ediciones Mox (art toys hechos a mano en CDMX). React 19 + TypeScript + Vite + MUI 6, desplegado en Netlify.
Este archivo es el estándar del repo: aplica a personas y a agentes por igual.

## Comandos

| Comando                      | Qué hace                                                                    |
| ---------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                | Servidor de desarrollo                                                      |
| `npm run check`              | Lint + typecheck + validación del catálogo (correr antes de cada commit)    |
| `npm run build`              | Valida catálogo, typecheck, build y post-build SEO (prerender, OG, sitemap) |
| `npm run format`             | Formatea con Prettier                                                       |
| `npm run optimize:specimens` | Convierte fotos PNG/JPG de `src/assets/specimens/` a WebP                   |
| `npm run optimize:images`    | Genera variantes AVIF/WebP y `manifest.json` (hero, eventos y piezas)       |

CI (`.github/workflows/ci.yml`) corre formato, lint, typecheck, validación y build en cada PR. Node 24 (`.nvmrc`).

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
2. **Colores y modo oscuro**: el sitio sigue `prefers-color-scheme` vía CSS variables del tema. En componentes usar claves del tema (`text.primary`, `accent.text`, …) o `ui` de `src/theme/uiTokens.ts` dentro de strings (`1px solid ${ui.ink}`). `brandPalette` solo para superficies de marca que no cambian (hero, bloque Taller, footer). Texto de acento siempre con `accent.text`/`ui.accentText` (no `primary.main`, que no tiene contraste suficiente en oscuro). ESLint bloquea hex sueltos en `.tsx`.
3. **Rutas**: solo vía `appPaths` (`src/constants/paths.ts`). **Una ruta nueva debe agregarse a `pages` en `scripts/postbuild-seo.mjs`**: en producción, toda URL sin HTML prerenderizado responde 404 (`public/_redirects`).
4. **Datos, no condicionales por id**: si una pieza o evento necesita un comportamiento distinto (etiqueta, tamaño, badge), se agrega un campo al dato. Nunca `if (specimen.id === 'mox-0XX')`.
5. **Lógica del catálogo** (filtrar, formatear, ordenar) va en `src/services/specimens/catalog.ts` como funciones puras, no dentro de componentes.
6. **Imágenes**: toda imagen de contenido pasa por el pipeline responsivo (`responsiveImage()`) con `width`/`height` y `sizes`. Las imágenes de piezas usan `ProtectedImage`.
7. **SEO por página**: los metadatos se construyen en `src/seo/pageMeta.ts` (una función por página) y cada página llama a `usePageMeta(...)` con ellos. El mismo módulo lo usa el prerender del build, así que cliente y HTML estático nunca difieren. `src/seo/pageMeta.ts` y lo que importa (`format.ts`, `galleryCopy.ts`, `site.ts`, `paths.ts`) los ejecuta Node: solo imports relativos con `.ts` o `import type`.
8. **Accesibilidad**: `eslint-plugin-jsx-a11y` está activo. Objetivos táctiles de al menos 44px, `alt` descriptivo y animaciones condicionadas a `prefers-reduced-motion`.
9. **Formato**: Prettier (`.prettierrc.json`) + `.editorconfig`. Finales de línea LF (`.gitattributes`).

## Agregar una pieza al catálogo

1. Copiar la foto a `src/assets/specimens/mox-0XX.(png|jpg|webp)`. Si no es WebP: `npm run optimize:specimens`.
2. `npm run optimize:images` (genera variantes en `src/assets/optimized/` y actualiza `manifest.json`).
3. Agregar la entrada en `src/data/specimens.json`. Obligatorios: `id` (`mox-001`), `name`, `artist`, `year`, `material`, `imageFile`, `description`. Opcionales: `height`, `origin`, `sourceUrl`, `edition`, `status` (`available` | `sold` | `pre-order`), `collaboration` (`true` muestra la insignia).
4. `npm run check`. El validador rechaza campos desconocidos, tipos incorrectos e imágenes sin variantes. El sitemap se regenera solo en el build.

Eventos: cartel en `src/assets/events/<id>.webp`, `npm run optimize:images` y entrada en `src/data/events.ts` con `poster: responsiveImage('event-<id>')`.

## Git

- Ramas: `feat/…`, `fix/…`, `chore/…`, `content/…`, `perf/…`, `improve/…`.
- Commits en formato Conventional Commits: `feat:`, `fix:`, `perf:`, `style:`, `content:`, `chore:`, `docs:`.
- No commitear `dist/`, `reports/`, `_ref-gallery/` ni originales sin procesar.
