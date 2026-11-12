import { Box, Button, ButtonBase, Typography } from '@mui/material'
import {
  archiveStatusFilterOptions,
  defaultArchiveStatusFilter,
  galleryCopy,
  type ArchiveStatusFilter,
} from '@/content/galleryCopy'
import { SECTION_ARCHIVE_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { countSpecimensByStatusFilter, getSpecimensByStatusFilter } from '@/services/specimens/catalog'
import { useState } from 'react'
import { GalleryContentBounds } from './GalleryContentBounds'
import { SpecimenCard } from './SpecimenCard'

const INITIAL_VISIBLE_COUNT = 12
const PAGE_SIZE = 12

type ArchiveFilterProps = {
  value: ArchiveStatusFilter
  onChange: (value: ArchiveStatusFilter) => void
}

function ArchiveFilter({ value, onChange }: ArchiveFilterProps) {
  return (
    <Box
      role="group"
      aria-label={galleryCopy.archive.filterGroupAriaLabel}
      sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2.5, rowGap: 1 }}
    >
      {archiveStatusFilterOptions.map((option) => {
        const count = countSpecimensByStatusFilter(option.value)
        const selected = option.value === value
        return (
          <ButtonBase
            key={option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            disabled={count === 0}
            sx={{
              color: selected ? 'text.primary' : 'text.secondary',
              textDecoration: 'underline',
              textDecorationThickness: '1.5px',
              textUnderlineOffset: '5px',
              textDecorationColor: selected ? 'currentColor' : 'transparent',
              '&:hover': { color: 'text.primary' },
              '&.Mui-disabled': { opacity: 0.4 },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
            }}
          >
            <Typography variant="overline" component="span">
              {option.label}{' '}
              <Box component="span" sx={{ opacity: 0.6 }}>
                ({count})
              </Box>
            </Typography>
          </ButtonBase>
        )
      })}
    </Box>
  )
}

export function ArchiveGrid() {
  const { archive } = galleryCopy
  const [filter, setFilter] = useState<ArchiveStatusFilter>(defaultArchiveStatusFilter)
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT)
  const filtered = getSpecimensByStatusFilter(filter)
  const visible = filtered.slice(0, visibleCount)
  const canLoadMore = visibleCount < filtered.length

  const handleFilterChange = (value: ArchiveStatusFilter) => {
    setFilter(value)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }

  return (
    <Box
      component="section"
      id={SECTION_ARCHIVE_ID}
      aria-labelledby="archive-title"
      sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}
    >
      <GalleryContentBounds>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            columnGap: 4,
            rowGap: 2,
            pb: 2,
            mb: { xs: 4, md: 5 },
            borderBottom: '1.5px solid',
            borderColor: 'text.primary',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <Typography id="archive-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '4.5rem' } }}>
              {archive.sectionTitle}
            </Typography>
            <Typography variant="overline" color="text.secondary">
              {archive.countLabel(filtered.length)}
            </Typography>
          </Box>
          <ArchiveFilter value={filter} onChange={handleFilterChange} />
        </Box>

        {visible.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {archive.empty}
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              columnGap: { xs: 3, md: 4 },
              rowGap: { xs: 6, md: 7 },
            }}
          >
            {visible.map((specimen) => (
              <SpecimenCard key={specimen.id} specimen={specimen} />
            ))}
          </Box>
        )}

        {canLoadMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length))}
            >
              {archive.loadMore}
            </Button>
          </Box>
        )}
      </GalleryContentBounds>
    </Box>
  )
}
