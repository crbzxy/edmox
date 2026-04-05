import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Logo } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_CONTACT_EMAIL, GALLERY_INSTAGRAM_URL } from '@/constants/gallery'
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
          <Logo alt={brand.logoAlt} size="nav" />
          <Typography variant="overline" color="text.secondary">
            {footer.copyrightLine(currentYear)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <MuiLink
            href={GALLERY_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            color="text.secondary"
            sx={{ '&:hover': { color: 'text.primary' } }}
          >
            <Typography variant="overline">{footer.instagram}</Typography>
          </MuiLink>
          <MuiLink
            href={`mailto:${GALLERY_CONTACT_EMAIL}`}
            color="text.secondary"
            sx={{ '&:hover': { color: 'text.primary' } }}
          >
            <Typography variant="overline">{footer.contact}</Typography>
          </MuiLink>
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
