import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ABOUT_ID } from '@/constants/gallery'
import { GalleryContentBounds } from './GalleryContentBounds'
import { vitrineSurfaceSx } from '@/theme/createAppTheme'

function AboutIntro() {
  const { about } = galleryCopy
  return (
    <Box>
      <Typography variant="overline" color="primary">
        {about.overline}
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mt: 2, fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700 }}>
        {about.titleLine1}
        <br />
        {about.titleLine2Before}
        <Box component="span" sx={{ color: 'primary.main' }}>
          {about.titleAccent}
        </Box>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        {about.paragraph1}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {about.paragraph2}
      </Typography>
    </Box>
  )
}

function AboutStatsGrid() {
  const theme = useTheme()
  const cardSx = vitrineSurfaceSx(theme.palette.mode)

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 3 }}>
      {galleryCopy.about.stats.map((stat) => (
        <Box key={stat.label} sx={{ p: 3, ...cardSx }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {stat.value}
          </Typography>
          <Typography variant="overline" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

function AboutValuesCard() {
  const theme = useTheme()
  const cardSx = vitrineSurfaceSx(theme.palette.mode)

  return (
    <Box sx={{ p: 3, ...cardSx, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {galleryCopy.about.valuesTitle}
      </Typography>
      {galleryCopy.about.values.map((item) => (
        <Box
          key={item.title}
          sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, '&:first-of-type': { borderTop: 'none', pt: 0 } }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', lineHeight: 1.6 }}>
            {item.description}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export function AboutSection() {
  return (
    <Box
      component="section"
      id={SECTION_ABOUT_ID}
      sx={{
        py: 12,
        borderTop: '1px solid',
        borderColor: 'divider',
        /* Barra fija (Toolbar ~64–72px + padding): el ancla no queda tapada */
        scrollMarginTop: { xs: '88px', sm: '96px' },
      }}
    >
      <GalleryContentBounds sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 8 }}>
        <AboutIntro />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
          <AboutStatsGrid />
          <AboutValuesCard />
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
