import { Box, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import type { Specimen } from '@/data/specimens'

const SWATCH_PX = 9

/** Etiqueta de estado tipo inventario: un cuadro (lleno, contorno o gris) + texto. */
export function SpecimenStatusTag({ status }: { status: Specimen['status'] }) {
  if (!status) return null

  const swatchSx =
    status === 'available'
      ? { bgcolor: 'primary.main' }
      : status === 'pre-order'
        ? { border: '1.5px solid', borderColor: 'primary.main' }
        : { border: '1.5px solid', borderColor: 'text.secondary' }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        color: status === 'sold' ? 'text.secondary' : 'text.primary',
        whiteSpace: 'nowrap',
      }}
    >
      <Box aria-hidden sx={{ width: SWATCH_PX, height: SWATCH_PX, flexShrink: 0, ...swatchSx }} />
      <Typography variant="overline" component="span">
        {galleryCopy.specimenStatus[status]}
      </Typography>
    </Box>
  )
}
