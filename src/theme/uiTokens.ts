/**
 * Tokens semánticos como CSS variables del tema MUI (`cssVariables: true`).
 * Cambian solos con `prefers-color-scheme`; sirven dentro de strings compuestos
 * (`1px solid ${ui.ink}`, sombras) donde las claves del tema (`'text.primary'`) no aplican.
 */
export const ui = {
  /** Fondo de sección. */
  surface: 'var(--mui-palette-background-default)',
  /** Tarjetas y superficies elevadas. */
  surfaceRaised: 'var(--mui-palette-background-paper)',
  /** Texto principal, bordes fuertes y sombras duras. */
  ink: 'var(--mui-palette-text-primary)',
  /** Texto secundario y bordes suaves. */
  inkSoft: 'var(--mui-palette-text-secondary)',
  /** Texto de acento (rojo legible en ambos modos). */
  accentText: 'var(--mui-palette-accent-text)',
  /** Fondo de botones e insignias de acento. */
  accent: 'var(--mui-palette-primary-main)',
  accentHover: 'var(--mui-palette-primary-dark)',
  /** Texto sobre `accent`. */
  onAccent: 'var(--mui-palette-primary-contrastText)',
} as const
