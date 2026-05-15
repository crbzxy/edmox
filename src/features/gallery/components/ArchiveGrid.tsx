import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  archiveMaterialFilterOptions,
  defaultArchiveMaterialFilter,
  galleryCopy,
  type ArchiveMaterialFilter,
} from '@/content/galleryCopy'
import { GRID_COLUMN_SPANS, SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { getSpecimensByArchiveFilter } from '@/services/specimens/catalog'
import { useEffect, useState } from 'react'
import { GalleryContentBounds } from './GalleryContentBounds'
import { SpecimenCard } from './SpecimenCard'

type ArchiveToolbarProps = {
  filter: ArchiveMaterialFilter
  onFilterChange: (value: ArchiveMaterialFilter) => void
  count: number
}

function ArchiveToolbar({ filter, onFilterChange, count }: ArchiveToolbarProps) {
  const { archive } = galleryCopy
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 3,
        mb: 8,
      }}
    >
      <Box>
        <Typography variant="overline" color="text.secondary">
          {archive.sectionOverline(count)}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mt: 1, fontSize: { xs: '2rem', md: '2.75rem' } }}>
          {archive.sectionTitle}
        </Typography>
      </Box>
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={(_, value: ArchiveMaterialFilter | null) => {
          if (value !== null) onFilterChange(value)
        }}
        aria-label={archive.filterGroupAriaLabel}
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        {archiveMaterialFilterOptions.map((option) => (
          <ToggleButton key={option.value} value={option.value} aria-pressed={filter === option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export function ArchiveGrid() {
  const INITIAL_VISIBLE_COUNT = 12
  const PAGE_SIZE = 12

  const [filter, setFilter] = useState<ArchiveMaterialFilter>(defaultArchiveMaterialFilter)
  const filtered = getSpecimensByArchiveFilter(filter)
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT)

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [filter])

  const visible = filtered.slice(0, visibleCount)
  const canLoadMore = visibleCount < filtered.length

  return (
    <Box
      component="section"
      id={SECTION_ARCHIVE_ID}
      sx={{
        py: { xs: 12, md: 20 },
        scrollMarginTop: { xs: '88px', sm: '96px' },
      }}
    >
      <GalleryContentBounds>
        <ArchiveToolbar filter={filter} onFilterChange={setFilter} count={filtered.length} />
        <Grid container spacing={3}>
          {visible.map((specimen, index) => (
            <Grid key={specimen.id} size={{ xs: 12, md: GRID_COLUMN_SPANS[index % GRID_COLUMN_SPANS.length] }}>
              <SpecimenCard specimen={specimen} index={index} />
            </Grid>
          ))}
        </Grid>

        {canLoadMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Button
              variant="contained"
              onClick={() => {
                setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length))
              }}
              aria-label="Mostrar más piezas del archivo"
            >
              Mostrar más
            </Button>
          </Box>
        )}
      </GalleryContentBounds>
    </Box>
  )
}
