import { Box, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { GalleryContentBounds } from '../GalleryContentBounds'
import { SpecimenDetailBackLink } from './SpecimenDetailBackLink'

export function SpecimenDetailMissing() {
  return (
    <GalleryContentBounds
      sx={{
        pt: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ alignSelf: 'flex-start' }}>
        <SpecimenDetailBackLink />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {galleryCopy.specimenDetail.notFoundMessage}
      </Typography>
    </GalleryContentBounds>
  )
}
