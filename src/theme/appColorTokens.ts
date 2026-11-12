/**
 * Paleta derivada del logo Ediciones Mox (banda rojo carmesí + negro + tipografía blanca).
 * El fondo claro imita papel de catálogo impreso; no usar hex sueltos en componentes.
 *
 * - `brandPalette`: colores fijos de marca. Solo para superficies que se ven igual en ambos modos
 *   (hero, bloque "Taller", footer).
 * - `appColorTokens`: valores por esquema (claro/oscuro) que alimentan el tema MUI.
 * - En componentes que siguen al sistema, usar `ui` (src/theme/uiTokens.ts) o claves del tema (`text.primary`).
 */
/** Radio visual del logo PNG (esquinas redondeadas). */
export const LOGO_CORNER_RADIUS_PX = 12

export const brandPalette = {
  red: '#A62C2D',
  redMuted: '#8B2425',
  redEmphasis: '#C43E3F',
  /** Rojo claro para texto de acento sobre fondos oscuros (contraste ≥ 4.5:1 sobre `night`). */
  redOnDark: '#E5625F',
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
    primaryDark: brandPalette.redMuted,
    accentText: brandPalette.red,
    secondaryMain: '#E2DED7',
    secondaryContrast: brandPalette.ink,
    themeColor: brandPalette.red,
  },
  dark: {
    backgroundDefault: brandPalette.night,
    backgroundPaper: brandPalette.nightRaised,
    textPrimary: brandPalette.bone,
    textSecondary: 'rgba(241, 238, 233, 0.68)',
    divider: 'rgba(241, 238, 233, 0.14)',
    // Fondos de botón/insignia: el rojo de marca mantiene contraste con texto blanco en ambos modos.
    primaryMain: brandPalette.red,
    primaryDark: brandPalette.redMuted,
    accentText: brandPalette.redOnDark,
    secondaryMain: '#1F1C1C',
    secondaryContrast: brandPalette.bone,
    themeColor: brandPalette.night,
  },
} as const
