import { createTheme, type PaletteMode } from '@mui/material/styles'
import { appColorTokens, brandPalette } from './appColorTokens'

export const bodyFontFamily = "'Archivo', system-ui, 'Segoe UI', sans-serif"
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

function buildPalette(mode: PaletteMode) {
  const colors = mode === 'light' ? appColorTokens.light : appColorTokens.dark
  return {
    mode,
    primary: {
      main: colors.primaryMain,
      contrastText: brandPalette.white,
      light: brandPalette.redEmphasis,
      dark: brandPalette.redMuted,
    },
    secondary: { main: colors.secondaryMain, contrastText: colors.secondaryContrast },
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

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: buildPalette(mode),
    typography: {
      fontFamily: bodyFontFamily,
      h1: displayTypeSx,
      h2: displayTypeSx,
      h3: { fontFamily: bodyFontFamily, fontWeight: 800, fontStretch: '85%', textTransform: 'uppercase', lineHeight: 1 },
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
        defaultProps: { underline: 'none' },
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
            backgroundColor: theme.palette.background.default,
            borderBottom: `1.5px solid ${theme.palette.text.primary}`,
            boxShadow: 'none',
          }),
        },
      },
    },
  })
}
