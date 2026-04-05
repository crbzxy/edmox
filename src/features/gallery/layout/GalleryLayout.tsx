import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { GalleryNav } from '../components/GalleryNav'

/**
 * Shell común de la galería: navegación fija + área de página (Outlet).
 * Evita repetir `GalleryNav` en cada pantalla.
 */
export function GalleryLayout() {
  return (
    <Box sx={{ minHeight: '100svh', bgcolor: 'background.default', color: 'text.primary' }}>
      <GalleryNav />
      <Outlet />
    </Box>
  )
}
