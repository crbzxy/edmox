/**
 * Paleta derivada del logo Ediciones Mox (banda rojo carmesí + negro + tipografía blanca).
 * Valores tomados del PNG de marca; no usar hex sueltos en componentes.
 */
/** Radio visual del logo PNG (esquinas redondeadas). */
export const LOGO_CORNER_RADIUS_PX = 12

export const brandPalette = {
  red: '#A62C2D',
  redMuted: '#8B2425',
  redEmphasis: '#C43E3F',
  black: '#000000',
  ink: '#0A0A0A',
  inkElevated: '#141414',
  white: '#FFFFFF',
  fog: '#F5F4F4',
  mist: '#E8E6E6',
  slate: '#6B6565',
  graphite: '#2A2828',
} as const

export const appColorTokens = {
  light: {
    backgroundDefault: brandPalette.fog,
    backgroundPaper: brandPalette.white,
    textPrimary: brandPalette.graphite,
    textSecondary: brandPalette.slate,
    divider: brandPalette.mist,
    primaryMain: brandPalette.red,
    secondaryMain: brandPalette.mist,
    secondaryContrast: brandPalette.graphite,
    focusRing: brandPalette.red,
    vitrineGlass: 'rgba(166, 44, 45, 0.06)',
    vitrineBorder: 'rgba(42, 40, 40, 0.12)',
  },
  dark: {
    backgroundDefault: brandPalette.ink,
    backgroundPaper: brandPalette.inkElevated,
    textPrimary: brandPalette.white,
    textSecondary: 'rgba(255, 255, 255, 0.62)',
    divider: 'rgba(255, 255, 255, 0.1)',
    primaryMain: brandPalette.red,
    secondaryMain: '#1C1C1C',
    secondaryContrast: brandPalette.white,
    focusRing: brandPalette.redEmphasis,
    vitrineGlass: 'rgba(255, 255, 255, 0.04)',
    vitrineBorder: 'rgba(255, 255, 255, 0.12)',
  },
} as const
