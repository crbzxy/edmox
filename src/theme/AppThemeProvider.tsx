import { CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'
import { appTheme } from './createAppTheme'

type AppThemeProviderProps = {
  children: ReactNode
}

/** El esquema claro/oscuro lo resuelve CSS (`prefers-color-scheme`) vía las variables del tema: sin re-render ni parpadeo. */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
