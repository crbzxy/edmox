import { Box, Button, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_INSTAGRAM_URL } from '@/constants/gallery'
import type { Specimen } from '@/data/specimens'
import { formatCatalogNumber, formatEdition, formatHeight, splitSpecimenName } from '@/services/specimens/catalog'
import { SpecimenStatusTag } from '../SpecimenStatusTag'

type SpecimenDetailMetaPanelProps = {
  specimen: Specimen
}

function buildDetailRows(specimen: Specimen): [string, string][] {
  const { metaLabels } = galleryCopy.specimenDetail
  const rows: [string, string | undefined][] = [
    [metaLabels.artist, specimen.artist],
    [metaLabels.material, specimen.material],
    [metaLabels.height, formatHeight(specimen.height)],
    [metaLabels.edition, formatEdition(specimen.edition)],
    [metaLabels.year, String(specimen.year)],
    [metaLabels.origin, specimen.origin],
  ]
  return rows.filter((row): row is [string, string] => Boolean(row[1]))
}

function SpecimenMetadataTable({ specimen }: SpecimenDetailMetaPanelProps) {
  return (
    <Box component="dl" sx={{ m: 0, mt: 4, borderTop: '1.5px solid', borderColor: 'text.primary' }}>
      {buildDetailRows(specimen).map(([label, value]) => (
        <Box
          key={label}
          sx={{
            display: 'grid',
            gridTemplateColumns: '7rem 1fr',
            gap: 2,
            py: 1.25,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography component="dt" variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Typography component="dd" variant="overline" sx={{ m: 0 }}>
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export function SpecimenDetailMetaPanel({ specimen }: SpecimenDetailMetaPanelProps) {
  const { inquireCta, soldNote } = galleryCopy.specimenDetail
  const { title, variant } = splitSpecimenName(specimen.name)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="overline" color="text.secondary">
          {formatCatalogNumber(specimen.id)}
        </Typography>
        <SpecimenStatusTag status={specimen.status} />
      </Box>
      <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '3.5rem', md: '4.75rem' }, overflowWrap: 'anywhere' }}>
        {title}
      </Typography>
      {variant && (
        <Typography variant="h3" component="p" color="primary" sx={{ mt: 1, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
          {variant}
        </Typography>
      )}

      <Typography variant="body1" sx={{ mt: 3, maxWidth: 520 }}>
        {specimen.description}
      </Typography>

      <SpecimenMetadataTable specimen={specimen} />

      <Box sx={{ mt: 4 }}>
        {specimen.status === 'sold' ? (
          <Typography variant="body2" color="text.secondary">
            {soldNote}
          </Typography>
        ) : (
          <Button
            component="a"
            href={GALLERY_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ maxWidth: { sm: 360 } }}
          >
            {inquireCta} ↗
          </Button>
        )}
      </Box>
    </Box>
  )
}
