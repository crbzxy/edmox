import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { galleryCopy } from '@/content/galleryCopy'
import { appPaths } from '@/constants/paths'
import type { Specimen } from '@/data/specimens'
import { formatCatalogNumber, getAdjacentSpecimens, splitSpecimenName } from '@/services/specimens/catalog'

function PagerLink({ specimen, label, align }: { specimen: Specimen; label: string; align: 'left' | 'right' }) {
  return (
    <Box
      component={RouterLink}
      to={appPaths.specimenDetail(specimen.id)}
      sx={{
        display: 'block',
        minWidth: 0,
        overflowWrap: 'anywhere',
        textAlign: align,
        color: 'inherit',
        textDecoration: 'none',
        gridColumn: align === 'right' ? 2 : 1,
        '&:hover .pager-title': { color: 'accent.text' },
      }}
    >
      <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
        {label} · {formatCatalogNumber(specimen.id)}
      </Typography>
      <Typography variant="h3" component="span" className="pager-title" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {splitSpecimenName(specimen.name).title}
      </Typography>
    </Box>
  )
}

/** Navegación anterior / siguiente entre fichas, en el orden del archivo. */
export function SpecimenDetailPager({ specimenId }: { specimenId: string }) {
  const { previous, next } = getAdjacentSpecimens(specimenId)
  const { previous: previousLabel, next: nextLabel } = galleryCopy.specimenDetail
  if (!previous && !next) return null

  return (
    <Box
      component="nav"
      sx={{
        mt: { xs: 8, md: 12 },
        pt: 2,
        borderTop: '1.5px solid',
        borderColor: 'text.primary',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 3,
      }}
    >
      {previous && <PagerLink specimen={previous} label={`← ${previousLabel}`} align="left" />}
      {next && <PagerLink specimen={next} label={`${nextLabel} →`} align="right" />}
    </Box>
  )
}
