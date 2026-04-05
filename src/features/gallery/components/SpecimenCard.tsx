import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { useTheme, type Theme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import {
  ARCHIVE_CARD_IMAGE_FRAME_HEIGHT,
  STAGGER_DELAY_MS_CAP,
  STAGGER_DELAY_STEP_MS,
  STATUS_DOT_SIZE_PX,
} from '@/constants/galleryUi'
import type { Specimen } from '@/data/specimens'
import { vitrineSurfaceSx } from '@/theme/createAppTheme'

type SpecimenCardProps = {
  specimen: Specimen
  index: number
}

const statusPulseSx = {
  '@keyframes specimenStatusPulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  animation: 'specimenStatusPulse 2s ease-in-out infinite',
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
} as const

function SpecimenStatusDot({ status }: { status: Specimen['status'] }) {
  const theme = useTheme()
  const dot = { width: STATUS_DOT_SIZE_PX, height: STATUS_DOT_SIZE_PX, borderRadius: '50%' }
  if (status === 'available') {
    return <Box sx={{ ...dot, bgcolor: 'primary.main', ...statusPulseSx }} />
  }
  if (status === 'pre-order') {
    return <Box sx={{ ...dot, bgcolor: 'warning.main', ...statusPulseSx }} />
  }
  return <Box sx={{ ...dot, bgcolor: theme.palette.text.secondary }} />
}

type SpecimenCardMediaProps = {
  specimen: Specimen
  index: number
}

function SpecimenCardMedia({ specimen, index }: SpecimenCardMediaProps) {
  const delay = Math.min(index, STAGGER_DELAY_MS_CAP) * STAGGER_DELAY_STEP_MS
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          height: ARCHIVE_CARD_IMAGE_FRAME_HEIGHT,
          width: 'max-content',
          maxWidth: '100%',
          minWidth: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'secondary.main',
          '& img': {
            display: 'block',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            transition: 'filter 700ms ease',
            filter: 'grayscale(1)',
          },
          '&:hover img': {
            filter: 'grayscale(0)',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& img': { filter: 'none' },
          },
        }}
      >
        <Box component="img" src={specimen.image} alt={specimen.name} loading="lazy" sx={{ transitionDelay: `${delay}ms` }} />
      </Box>
    </Box>
  )
}

function hoverWash(theme: Theme) {
  return theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
}

export function SpecimenCard({ specimen, index }: SpecimenCardProps) {
  const theme = useTheme()
  const vitrine = vitrineSurfaceSx(theme.palette.mode)

  return (
    <Card
      elevation={0}
      sx={{
        ...vitrine,
        transition: 'transform 280ms cubic-bezier(0.2, 0, 0, 1)',
        '&:hover': { transform: 'translateY(-8px)' },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={appPaths.specimenDetail(specimen.id)}
        sx={{
          p: 2,
          alignItems: 'stretch',
          flexDirection: 'column',
          transition: 'background-color 200ms cubic-bezier(0.2, 0, 0, 1)',
          '&:hover': { bgcolor: hoverWash(theme) },
        }}
      >
        <SpecimenCardMedia specimen={specimen} index={index} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2 }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
              {specimen.material} · {specimen.year}
            </Typography>
            <Typography variant="h3" component="h3" sx={{ mt: 0.5, fontSize: '1.25rem' }}>
              {specimen.name}
            </Typography>
            <Typography variant="overline" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {specimen.artist}
            </Typography>
          </Box>
          <SpecimenStatusDot status={specimen.status} />
        </Box>
      </CardActionArea>
    </Card>
  )
}
