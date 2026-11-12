import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: { text: string }
  }
  interface PaletteOptions {
    accent?: { text: string }
  }
}
