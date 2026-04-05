import { alpha, createTheme, type PaletteMode } from '@mui/material/styles'
import { appColorTokens, brandPalette } from './appColorTokens'

const fontStack = "'Roboto', system-ui, 'Segoe UI', sans-serif"

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
    warning: {
      main: mode === 'dark' ? '#fbbf24' : '#d97706',
    },
  }
}

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: buildPalette(mode),
    typography: {
      fontFamily: fontStack,
      h1: { fontFamily: fontStack, fontWeight: 300, letterSpacing: '-0.02em' },
      h2: { fontFamily: fontStack, fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em' },
      h3: { fontFamily: fontStack, fontWeight: 400, fontStyle: 'italic' },
      body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
      body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
      overline: {
        fontFamily: fontStack,
        fontSize: '0.625rem',
        fontWeight: 500,
        letterSpacing: '0.2em',
        lineHeight: 1.5,
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
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            transition: 'color 200ms cubic-bezier(0.2, 0, 0, 1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 0,
            transition:
              'color 200ms cubic-bezier(0.2, 0, 0, 1), border-color 200ms cubic-bezier(0.2, 0, 0, 1), background-color 200ms cubic-bezier(0.2, 0, 0, 1)',
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 0,
            px: 2,
            py: 1,
            fontSize: '0.625rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            transition:
              'color 200ms cubic-bezier(0.2, 0, 0, 1), border-color 200ms cubic-bezier(0.2, 0, 0, 1), background-color 200ms cubic-bezier(0.2, 0, 0, 1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.85),
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.06 : 0.12)}`,
            boxShadow: 'none',
          }),
        },
      },
    },
  })
}

export function vitrineSurfaceSx(mode: PaletteMode) {
  const colors = mode === 'light' ? appColorTokens.light : appColorTokens.dark
  return {
    backgroundColor: colors.vitrineGlass,
    border: `1px solid ${colors.vitrineBorder}`,
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
    backdropFilter: 'blur(12px)',
  } as const
}
