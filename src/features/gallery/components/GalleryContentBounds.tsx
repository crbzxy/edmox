import { Box, type BoxProps } from '@mui/material'
import { GALLERY_MAX_CONTENT_WIDTH_PX } from '@/constants/gallery'

/**
 * Centra el contenido y limita su ancho a {@link GALLERY_MAX_CONTENT_WIDTH_PX}.
 */
export function GalleryContentBounds({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={[
        {
          width: '100%',
          maxWidth: GALLERY_MAX_CONTENT_WIDTH_PX,
          mx: 'auto',
          boxSizing: 'border-box',
          px: { xs: 3, sm: 4, lg: 6 },
        },
        ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
      ]}
      {...props}
    />
  )
}
