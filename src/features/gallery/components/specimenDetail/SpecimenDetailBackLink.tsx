import { Link as MuiLink, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { appPaths } from '@/constants/paths'
import { Link as RouterLink } from 'react-router-dom'

export function SpecimenDetailBackLink() {
  const { backArrow, backToArchive } = galleryCopy.specimenDetail
  return (
    <MuiLink
      component={RouterLink}
      to={appPaths.home}
      color="text.secondary"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 6, '&:hover': { color: 'text.primary' } }}
    >
      <Typography component="span" variant="body2" aria-hidden>
        {backArrow}
      </Typography>
      <Typography variant="overline">{backToArchive}</Typography>
    </MuiLink>
  )
}
