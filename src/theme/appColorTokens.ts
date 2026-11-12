/**
 * Paleta derivada del logo Ediciones Mox (banda rojo carmesí + negro + tipografía blanca).
 * El fondo claro imita papel de catálogo impreso; no usar hex sueltos en componentes.
 */
/** Radio visual del logo PNG (esquinas redondeadas). */
export const LOGO_CORNER_RADIUS_PX = 12

export const brandPalette = {
  red: '#A62C2D',
  redMuted: '#8B2425',
  redEmphasis: '#C43E3F',
  black: '#000000',
  white: '#FFFFFF',
  paper: '#EFECE6',
  paperRaised: '#F7F5F1',
  ink: '#161414',
  inkSoft: '#5E5856',
  night: '#0E0D0D',
  nightRaised: '#191717',
  bone: '#F1EEE9',
} as const

export const appColorTokens = {
  light: {
    backgroundDefault: brandPalette.paper,
    backgroundPaper: brandPalette.paperRaised,
    textPrimary: brandPalette.ink,
    textSecondary: brandPalette.inkSoft,
    divider: 'rgba(22, 20, 20, 0.16)',
    primaryMain: brandPalette.red,
    secondaryMain: '#E2DED7',
    secondaryContrast: brandPalette.ink,
  },
  dark: {
    backgroundDefault: brandPalette.night,
    backgroundPaper: brandPalette.nightRaised,
    textPrimary: brandPalette.bone,
    textSecondary: 'rgba(241, 238, 233, 0.64)',
    divider: 'rgba(241, 238, 233, 0.14)',
    primaryMain: brandPalette.redEmphasis,
    secondaryMain: '#1F1C1C',
    secondaryContrast: brandPalette.bone,
  },
} as const
