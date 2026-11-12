import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { ProtectedImage } from '@/components/ProtectedImage'
import type { Specimen } from '@/data/specimens'
import {
  formatCatalogNumber,
  formatEdition,
  formatHeight,
  specimenImageAlt,
  splitSpecimenName,
} from '@/services/specimens/catalog'
import { galleryCopy } from '@/content/galleryCopy'
import { ui } from '@/theme/uiTokens'

export function SpecimenCard({ specimen }: { specimen: Specimen }) {
  const { title, variant } = splitSpecimenName(specimen.name)
  const facts = [formatHeight(specimen.height), formatEdition(specimen.edition)].filter(Boolean)
  const collaboration = specimen.id === 'mox-016'

  return (
    <Box
      component={RouterLink}
      to={appPaths.specimenDetail(specimen.id)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        color: ui.ink,
        textDecoration: 'none',
        bgcolor: ui.surfaceRaised,
        border: '1px solid',
        borderColor: ui.ink,
        transition: 'box-shadow 180ms, transform 180ms',
        '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
          '&:hover': { transform: 'translate(-3px, -3px)', boxShadow: `6px 6px 0 ${ui.ink}` },
        },
        '&:focus-visible': { outline: `3px solid ${ui.accentText}`, outlineOffset: 4 },
        '&:hover .card-arrow': { bgcolor: ui.accent, color: ui.onAccent, borderColor: ui.accent },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: ui.surface }}>
        <ProtectedImage
          src={specimen.image}
          srcSet={specimen.imageSrcSet}
          sizes="(min-width: 1280px) 378px, (min-width: 1200px) calc((100vw - 144px) / 3), (min-width: 600px) calc((100vw - 88px) / 2), calc(100vw - 48px)"
          alt={specimenImageAlt(specimen)}
          loading="lazy"
          wrapperSx={{ display: 'block', width: '100%', height: '100%' }}
          imageSx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {collaboration && (
          <Typography
            variant="overline"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              px: 1.5,
              py: 0.75,
              bgcolor: ui.accent,
              color: ui.onAccent,
              transform: 'rotate(-3deg)',
            }}
          >
            Colaboración
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          p: { xs: 2.5, md: 3 },
          borderTop: `1px solid ${ui.ink}`,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, mb: 2 }}>
          <Typography variant="overline" sx={{ color: ui.inkSoft }}>
            {formatCatalogNumber(specimen.id)}
          </Typography>
          {specimen.status && (
            <Typography variant="overline" sx={{ color: specimen.status === 'sold' ? ui.inkSoft : ui.accentText }}>
              {specimen.status !== 'sold' && '● '}
              {galleryCopy.specimenStatus[specimen.status]}
            </Typography>
          )}
        </Box>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.1rem' }, overflowWrap: 'anywhere' }}>
          {title}
        </Typography>
        {variant && (
          <Typography variant="body2" sx={{ mt: 0.75, color: ui.inkSoft }}>
            {variant}
          </Typography>
        )}
        <Box
          sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mt: 'auto', pt: 3 }}
        >
          <Typography variant="overline" sx={{ color: ui.inkSoft }}>
            {facts.length ? facts.join(' · ') : specimen.material}
          </Typography>
          <Box
            aria-hidden="true"
            className="card-arrow"
            sx={{
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              width: 36,
              height: 36,
              border: '1px solid',
              transition: 'background-color 150ms, color 150ms',
            }}
          >
            ↗
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
