import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { responsiveImage } from '@/data/responsiveImages'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_HEADER_HEIGHT, SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { appPaths } from '@/constants/paths'
import { specimens } from '@/data/specimens'
import { brandPalette } from '@/theme/appColorTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

const heroFeatured = responsiveImage('hero')

export function HeroSection() {
  const { hero, brand } = galleryCopy

  return (
    <Box component="section" aria-labelledby="hero-title" sx={{ pt: GALLERY_HEADER_HEIGHT }}>
      <Box sx={{
        position: 'relative', isolation: 'isolate', display: 'flex', alignItems: 'flex-end',
        minHeight: { xs: 620, sm: 680, md: `clamp(620px, calc(100svh - ${GALLERY_HEADER_HEIGHT.sm}), 780px)` },
        bgcolor: brandPalette.black, color: brandPalette.white,
      }}>
        <Box
          component="img"
          src={heroFeatured.src}
          srcSet={heroFeatured.srcSet}
          sizes="100vw"
          width={heroFeatured.width}
          height={heroFeatured.height}
          alt={hero.featuredImageAlt}
          fetchPriority="high"
          sx={{
            position: 'absolute', inset: 0, zIndex: -2, display: 'block',
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: { xs: '54% center', md: 'center 58%' },
          }}
        />
        <Box aria-hidden="true" sx={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: {
            xs: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.96) 100%)',
            md: 'linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.6) 44%, rgba(0,0,0,0.08) 100%), linear-gradient(0deg, rgba(0,0,0,0.5), transparent 60%)',
          },
        }} />
        <GalleryContentBounds sx={{ py: { xs: 6, sm: 8, md: 10 } }}>
          <Box sx={{ maxWidth: 720 }}>
            <Typography variant="overline" sx={{ display: 'inline-block', mb: 3, px: 1.5, py: 1, bgcolor: brandPalette.red }}>
              {brand.shortName} · {hero.eyebrow}
            </Typography>
            <Typography id="hero-title" variant="h1" sx={{
              fontSize: { xs: 'clamp(2.75rem, 10vw, 4rem)', sm: '4.5rem', md: '5.5rem' },
              lineHeight: 0.98, textWrap: 'balance',
            }}>
              {hero.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, maxWidth: 490, color: brandPalette.bone }}>
              {hero.description}
            </Typography>
            <Button
              component={RouterLink}
              to={{ pathname: appPaths.home, hash: SECTION_ARCHIVE_ID }}
              variant="contained"
              sx={{ mt: 4, px: 4, bgcolor: brandPalette.red, color: brandPalette.white, '&:hover': { bgcolor: brandPalette.redMuted } }}
            >
              {hero.archiveCta} ↓
            </Button>
          </Box>
        </GalleryContentBounds>
      </Box>
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <GalleryContentBounds sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: { xs: 3, md: 5 }, rowGap: 1.5, py: 3 }}>
          {hero.metaLine(specimens.length).map((item) => (
            <Typography key={item} variant="overline" color="text.secondary">{item}</Typography>
          ))}
        </GalleryContentBounds>
      </Box>
    </Box>
  )
}
