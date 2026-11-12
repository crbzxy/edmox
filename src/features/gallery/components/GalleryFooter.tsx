import { Box, Button, Link as MuiLink, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { LogoFooter } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_INSTAGRAM_URL } from '@/constants/gallery'
import { brandPalette } from '@/theme/appColorTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

export function GalleryFooter() {
  const currentYear = new Date().getFullYear()
  const { brand, footer } = galleryCopy

  return (
    <Box component="footer">
      {/* Banda roja + negra: la misma composición del logo. */}
      <Box sx={{ bgcolor: brandPalette.red, color: brandPalette.white, py: { xs: 6, md: 8 } }}>
        <GalleryContentBounds
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
              {footer.ctaTitle}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 440, opacity: 0.9 }}>
              {footer.ctaBody}
            </Typography>
          </Box>
          <Button
            component="a"
            href={GALLERY_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flexShrink: 0,
              bgcolor: brandPalette.white,
              color: brandPalette.black,
              '&:hover': { bgcolor: brandPalette.black, color: brandPalette.white },
            }}
          >
            {footer.instagramCta} ↗
          </Button>
        </GalleryContentBounds>
      </Box>
      <Box sx={{ bgcolor: brandPalette.black, color: brandPalette.white, py: 4 }}>
        <GalleryContentBounds
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <LogoFooter alt={brand.logoAlt} width={112} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, opacity: 0.7 }}>
            <MuiLink
              component={RouterLink}
              to={appPaths.links}
              sx={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '4px', '&:hover': { opacity: 0.8 } }}
            >
              <Typography variant="overline">{galleryCopy.links.pageTitle}</Typography>
            </MuiLink>
            <Typography variant="overline">{brand.instagramHandle}</Typography>
            <Typography variant="overline">{footer.location}</Typography>
            <Typography variant="overline">{footer.copyrightLine(currentYear)}</Typography>
          </Box>
        </GalleryContentBounds>
      </Box>
    </Box>
  )
}
