import { Box, Link as MuiLink, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_CONTACT_EMAIL } from '@/constants/gallery'
import type { Specimen } from '@/data/specimens'

type SpecimenDetailMetaPanelProps = {
  specimen: Specimen
}

function buildDetailRows(specimen: Specimen): [string, string][] {
  const { metaLabels } = galleryCopy.specimenDetail
  const statusLabels = galleryCopy.specimenStatus
  return [
    [metaLabels.material, specimen.material],
    [metaLabels.height, specimen.height],
    [metaLabels.origin, specimen.origin],
    [metaLabels.year, String(specimen.year)],
    [metaLabels.edition, specimen.edition],
    [metaLabels.status, statusLabels[specimen.status]],
  ]
}

function SpecimenMetadataBlock({ specimen }: SpecimenDetailMetaPanelProps) {
  const rows = buildDetailRows(specimen)
  return (
    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {rows.map(([label, value]) => (
        <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
          <Typography variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="overline" color="text.primary" sx={{ textAlign: 'right' }}>
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export function SpecimenDetailMetaPanel({ specimen }: SpecimenDetailMetaPanelProps) {
  const { pieceIdOverline, inquireCta } = galleryCopy.specimenDetail
  return (
    <Box sx={{ pt: { xs: 0, lg: 1 } }}>
      <Typography variant="overline" color="text.secondary">
        {pieceIdOverline(specimen.id)}
      </Typography>
      <Typography variant="h1" component="h1" sx={{ mt: 1, fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 300, fontStyle: 'italic' }}>
        {specimen.name}
      </Typography>
      <Typography variant="overline" color="primary" sx={{ mt: 2, display: 'block' }}>
        {specimen.artist}
      </Typography>
      <SpecimenMetadataBlock specimen={specimen} />
      <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          {specimen.description}
        </Typography>
      </Box>
      {specimen.status !== 'sold' && (
        <Box sx={{ mt: 6 }}>
          <MuiLink href={`mailto:${GALLERY_CONTACT_EMAIL}`} color="primary" sx={{ '&:hover': { color: 'primary.light' } }}>
            <Typography variant="overline">{inquireCta}</Typography>
          </MuiLink>
        </Box>
      )}
    </Box>
  )
}
