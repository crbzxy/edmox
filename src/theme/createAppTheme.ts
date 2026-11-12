import { createTheme } from '@mui/material/styles'
import { appColorTokens, brandPalette } from './appColorTokens'

export const bodyFontFamily = "'Archivo Variable', 'Archivo', system-ui, 'Segoe UI', sans-serif"
export const monoFontFamily = "'IBM Plex Mono', ui-monospace, 'Cascadia Mono', monospace"

/** Titulares tipo empaque de juguete: Archivo condensada y pesada, en mayúsculas. */
export const displayTypeSx = {
  fontFamily: bodyFontFamily,
  fontWeight: 850,
  fontStretch: '72%',
  textTransform: 'uppercase',
  letterSpacing: '-0.005em',
  lineHeight: 0.9,
} as const

const easing = 'cubic-bezier(0.2, 0, 0, 1)'

function buildPalette(colors: (typeof appColorTokens)['light' | 'dark']) {
  return {
    primary: {
      main: colors.primaryMain,
      contrastText: brandPalette.white,
      light: brandPalette.redEmphasis,
      dark: colors.primaryDark,
    },
    secondary: { main: colors.secondaryMain, contrastText: colors.secondaryContrast },
    accent: { text: colors.accentText },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: colors.divider,
  }
}

export function createAppTheme() {
  return createTheme({
    // CSS variables + esquemas: el navegador elige claro/oscuro con `prefers-color-scheme`, sin re-render.
    cssVariables: { colorSchemeSelector: 'media' },
    colorSchemes: {
      light: { palette: buildPalette(appColorTokens.light) },
      dark: { palette: buildPalette(appColorTokens.dark) },
    },
    typography: {
      fontFamily: bodyFontFamily,
      h1: displayTypeSx,
      h2: displayTypeSx,
      h3: {
        fontFamily: bodyFontFamily,
        fontWeight: 800,
        fontStretch: '85%',
        textTransform: 'uppercase',
        lineHeight: 1,
      },
      body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
      button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
      overline: {
        fontFamily: monoFontFamily,
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        lineHeight: 1.4,
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          ':where(a, button, [tabindex]):focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: 4,
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              transitionDuration: '0.01ms !important',
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
            },
          },
          '::selection': { backgroundColor: brandPalette.red, color: brandPalette.white },
        },
      },
      MuiLink: {
        // Color de enlace por defecto legible en ambos modos (primary.main no alcanza 4.5:1 sobre fondo oscuro).
        defaultProps: { underline: 'none', color: 'accent.text' },
        styleOverrides: {
          root: { transition: `color 150ms ${easing}` },
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 0,
            minHeight: 44,
            padding: '12px 20px',
            transition: `color 150ms ${easing}, background-color 150ms ${easing}, border-color 150ms ${easing}`,
          },
          outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.background.default,
            borderBottom: `1.5px solid ${theme.vars.palette.text.primary}`,
            boxShadow: 'none',
          }),
        },
      },
    },
  })
}

export const appTheme = createAppTheme()
