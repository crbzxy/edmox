import { Box, Button, Typography } from '@mui/material'
import { LogoFooter } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_INSTAGRAM_URL } from '@/constants/gallery'
import { GalleryContentBounds } from './GalleryContentBounds'

export function GalleryFooter() {
  const currentYear = new Date().getFullYear()
  const { brand, footer } = galleryCopy

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GalleryContentBounds
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
          <LogoFooter alt={brand.logoAlt} />
          <Typography variant="overline" color="text.secondary">
            {footer.copyrightLine(currentYear)}
          </Typography>
        </Box>
        <Button
          component="a"
          href={GALLERY_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          aria-label={footer.instagramCta}
          sx={{
            px: 3,
            py: 1.25,
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            '&:hover': { filter: 'brightness(1.08)' },
            '&:active': { filter: 'brightness(0.95)' },
          }}
        >
          {footer.instagramCta}
        </Button>
      </GalleryContentBounds>
    </Box>
  )
}
