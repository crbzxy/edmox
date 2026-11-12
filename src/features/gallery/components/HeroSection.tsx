import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { responsiveImage } from '@/data/responsiveImages'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { appPaths } from '@/constants/paths'
import { specimens } from '@/data/specimens'
import { GalleryContentBounds } from './GalleryContentBounds'

const heroFeatured = responsiveImage('hero')

export function HeroSection() {
  const { hero } = galleryCopy

  return (
    <Box component="section" sx={{ pt: { xs: 12, sm: 15 }, pb: { xs: 6, md: 8 } }}>
      <GalleryContentBounds>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 4fr' },
            columnGap: { md: 6, lg: 10 },
            rowGap: 3,
            alignItems: 'end',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: { xs: '3.25rem', sm: '4.5rem', lg: '6.25rem' }, textWrap: 'balance' }}>
            {hero.title}
          </Typography>
          <Box sx={{ pb: { md: 1 } }}>
            <Typography variant="body1" sx={{ maxWidth: 380 }}>
              {hero.description}
            </Typography>
            <Button
              component={RouterLink}
              to={{ pathname: appPaths.home, hash: SECTION_ARCHIVE_ID }}
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              {hero.archiveCta} ↓
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 1.25,
            borderTop: '1.5px solid',
            borderColor: 'text.primary',
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 3,
            rowGap: 0.5,
            color: 'text.secondary',
          }}
        >
          {hero.metaLine(specimens.length).map((item) => (
            <Typography key={item} variant="overline">
              {item}
            </Typography>
          ))}
        </Box>

        <Box component="figure" sx={{ m: 0, mt: 1.5 }}>
          <Box
            component="img"
            src={heroFeatured.src}
            srcSet={heroFeatured.srcSet}
            sizes="(min-width: 1280px) 1232px, (min-width: 600px) calc(100vw - 48px), calc(100vw - 32px)"
            width={heroFeatured.width}
            height={heroFeatured.height}
            alt={hero.featuredImageAlt}
            fetchPriority="high"
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: { xs: '4 / 3', md: '21 / 9' },
              objectFit: 'cover',
              objectPosition: 'center 62%',
              bgcolor: 'common.black',
            }}
          />
          <Typography component="figcaption" variant="overline" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {hero.featuredCaption}
          </Typography>
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
