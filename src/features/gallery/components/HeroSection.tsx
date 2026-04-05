import { Box, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import heroBg from '@/assets/hero-bg.jpg'
import heroPhoto from '@/assets/hero-photo.jpg'
import { galleryCopy } from '@/content/galleryCopy'
import { vitrineSurfaceSx } from '@/theme/createAppTheme'
import { GalleryContentBounds } from './GalleryContentBounds'

function HeroBackground() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        '& img': { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 },
      }}
    >
      <Box component="img" src={heroBg} alt="" aria-hidden />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${theme.palette.background.default}, ${alpha(theme.palette.background.default, 0.7)}, ${alpha(theme.palette.background.default, 0.4)})`,
        }}
      />
    </Box>
  )
}

function HeroFeaturedCard() {
  const theme = useTheme()
  const { hero } = galleryCopy
  return (
    <Box sx={{ position: 'relative', ...vitrineSurfaceSx(theme.palette.mode), overflow: 'hidden' }}>
      <Box
        component="img"
        src={heroPhoto}
        alt={hero.featuredImageAlt}
        sx={{ width: '100%', height: { xs: 360, lg: 500 }, objectFit: 'cover', display: 'block' }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          background: `linear-gradient(to top, ${alpha(theme.palette.background.default, 0.92)}, transparent)`,
        }}
      >
        <Typography variant="overline" color="primary">
          {hero.featuredOverline}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 0.5, fontWeight: 500 }}>
          {hero.featuredCaption}
        </Typography>
      </Box>
    </Box>
  )
}

export function HeroSection() {
  const { hero } = galleryCopy
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <HeroBackground />
      <GalleryContentBounds
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 12, md: 16 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            {hero.eyebrow}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.75rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 700,
              lineHeight: 0.95,
            }}
          >
            {hero.titleLine1}
            <br />
            <Box component="span" sx={{ color: 'primary.main' }}>
              {hero.titleAccent}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4, maxWidth: 420 }}>
            {hero.description}
          </Typography>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              mt: 6,
              display: 'block',
              '@keyframes heroScrollHint': { '0%, 100%': { opacity: 0.55 }, '50%': { opacity: 1 } },
              animation: 'heroScrollHint 2.4s ease-in-out infinite',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.85 },
            }}
          >
            {hero.scrollHint}
          </Typography>
        </Box>
        <HeroFeaturedCard />
      </GalleryContentBounds>
    </Box>
  )
}
