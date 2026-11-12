import { Link as MuiLink, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { appPaths } from '@/constants/paths'
import { Link as RouterLink } from 'react-router-dom'

export function SpecimenDetailBackLink() {
  const { backArrow, backToArchive } = galleryCopy.specimenDetail
  return (
    <MuiLink
      component={RouterLink}
      to={{ pathname: appPaths.home, hash: SECTION_ARCHIVE_ID }}
      color="text.secondary"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, '&:hover': { color: 'text.primary' } }}
    >
      <Typography variant="overline" component="span">
        {backArrow} {backToArchive}
      </Typography>
    </MuiLink>
  )
}
