import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { useState } from 'react'
import {
  archiveStatusFilterOptions,
  defaultArchiveStatusFilter,
  galleryCopy,
  type ArchiveStatusFilter,
} from '@/content/galleryCopy'
import { SECTION_ARCHIVE_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { countSpecimensByStatusFilter, getSpecimensByStatusFilter } from '@/services/specimens/catalog'
import { ui } from '@/theme/uiTokens'
import { GalleryContentBounds } from './GalleryContentBounds'
import { SpecimenCard } from './SpecimenCard'

const PAGE_SIZE = 12

export function ArchiveGrid() {
  const { archive } = galleryCopy
  const [filter, setFilter] = useState<ArchiveStatusFilter>(defaultArchiveStatusFilter)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const filtered = getSpecimensByStatusFilter(filter)

  return (
    <Box
      component="section"
      id={SECTION_ARCHIVE_ID}
      aria-labelledby="archive-title"
      sx={{
        bgcolor: ui.surface,
        color: ui.ink,
        py: { xs: 7, md: 11 },
        scrollMarginTop: SECTION_SCROLL_MARGIN,
      }}
    >
      <GalleryContentBounds>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 3,
            mb: 4,
            pb: 2,
            borderBottom: `1px solid ${ui.ink}`,
          }}
        >
          <Typography variant="overline">Ediciones Mox / Catálogo 2026</Typography>
          <Typography variant="overline" sx={{ textAlign: 'right' }}>
            Coyoacán, CDMX ↗
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' },
            gap: 4,
            alignItems: 'end',
            mb: 5,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: ui.accentText, display: 'block', mb: 2 }}>
              Tirajes cortos. Personajes propios.
            </Typography>
            <Typography
              id="archive-title"
              variant="h2"
              sx={{ fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' }, lineHeight: 0.94 }}
            >
              Fuera de
              <Box component="span" sx={{ display: 'block', color: ui.accentText }}>
                serie<span aria-hidden="true"> ✳</span>
              </Box>
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ maxWidth: 360, color: ui.inkSoft }}>
            El archivo de nuestros monstruos. Explora las piezas, sus variantes y las colaboraciones que salen del
            taller.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            role="group"
            aria-label={archive.filterGroupAriaLabel}
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
          >
            {archiveStatusFilterOptions.map((option) => {
              const selected = option.value === filter
              const count = countSpecimensByStatusFilter(option.value)
              return (
                <ButtonBase
                  key={option.value}
                  aria-pressed={selected}
                  disabled={!count}
                  onClick={() => {
                    setFilter(option.value)
                    setVisibleCount(PAGE_SIZE)
                  }}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    border: `1px solid ${selected ? ui.ink : ui.inkSoft}`,
                    bgcolor: selected ? ui.ink : 'transparent',
                    color: selected ? ui.surface : ui.ink,
                    '&:hover': { bgcolor: selected ? ui.ink : ui.surfaceRaised },
                    '&.Mui-disabled': { opacity: 0.4 },
                  }}
                >
                  <Typography variant="overline">
                    {option.label}{' '}
                    <Box component="span" sx={{ ml: 1 }}>
                      {String(count).padStart(2, '0')}
                    </Box>
                  </Typography>
                </ButtonBase>
              )
            })}
          </Box>
          <Typography variant="overline">{archive.countLabel(filtered.length)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {filtered.slice(0, visibleCount).map((specimen) => (
            <SpecimenCard key={specimen.id} specimen={specimen} />
          ))}
        </Box>
        {!filtered.length && <Typography>{archive.empty}</Typography>}
        {visibleCount < filtered.length && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              variant="outlined"
              sx={{
                color: ui.ink,
                borderColor: ui.ink,
                px: 5,
                '&:hover': { borderColor: ui.ink, bgcolor: ui.surfaceRaised },
              }}
            >
              {archive.loadMore} +
            </Button>
          </Box>
        )}
      </GalleryContentBounds>
    </Box>
  )
}
