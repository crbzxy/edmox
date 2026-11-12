import { Box, Button, Link as MuiLink, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { LogoFooter } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_INSTAGRAM_URL, SECTION_ABOUT_ID, SECTION_ARCHIVE_ID, SECTION_EVENTS_ID } from '@/constants/gallery'
import { brandPalette as colors } from '@/theme/appColorTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

const footerLinkSx = {
  color: colors.paper,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  gap: 2,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline', textUnderlineOffset: '5px' },
} as const

export function GalleryFooter() {
  const { brand, footer, nav } = galleryCopy
  const explore = [
    { label: nav.archive, to: { pathname: appPaths.home, hash: SECTION_ARCHIVE_ID } },
    { label: nav.about, to: { pathname: appPaths.home, hash: SECTION_ABOUT_ID } },
    { label: nav.events, to: { pathname: appPaths.home, hash: SECTION_EVENTS_ID } },
    { label: galleryCopy.links.pageTitle, to: appPaths.links },
  ]

  return (
    <Box component="footer" sx={{ bgcolor: colors.ink, color: colors.paper }}>
      <Box sx={{ bgcolor: colors.red, color: colors.white, py: { xs: 6, sm: 8, md: 10 } }}>
        <GalleryContentBounds>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              pb: 3,
              mb: 4,
              borderBottom: '1px solid currentColor',
            }}
          >
            <Typography variant="overline">Del taller a tu colección</Typography>
            <Typography aria-hidden="true" sx={{ fontSize: 32, lineHeight: 1 }}>
              ✳
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 4fr)' },
              gap: { xs: 4, md: 8 },
              alignItems: 'end',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 'clamp(2.8rem, 11vw, 4.5rem)', sm: '4.75rem', lg: '6rem' },
                lineHeight: 0.95,
                maxWidth: 700,
              }}
            >
              {footer.ctaTitle}
            </Typography>
            <Box sx={{ maxWidth: 380 }}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {footer.ctaBody}
              </Typography>
              <Button
                href={GALLERY_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: colors.paper,
                  color: colors.ink,
                  width: { xs: '100%', sm: 'auto' },
                  px: 3,
                  gap: 3,
                  '&:hover': { bgcolor: colors.ink, color: colors.white },
                }}
              >
                {footer.instagramCta}
                <Box component="span" aria-hidden="true">
                  ↗
                </Box>
              </Button>
            </Box>
          </Box>
        </GalleryContentBounds>
      </Box>
      <GalleryContentBounds sx={{ pt: { xs: 6, md: 8 }, pb: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              sm: 'minmax(0, 1fr) minmax(0, 1fr)',
              md: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)',
            },
            gap: { xs: 4, md: 7 },
            pb: { xs: 5, md: 7 },
          }}
        >
          <Box sx={{ gridColumn: { sm: '1 / -1', md: 'auto' } }}>
            <MuiLink
              component={RouterLink}
              to={appPaths.home}
              aria-label={brand.homeLinkAriaLabel}
              sx={{ display: 'inline-block' }}
            >
              <LogoFooter alt="" width={160} />
            </MuiLink>
            <Typography variant="body2" sx={{ mt: 3, maxWidth: 300 }}>
              Personajes propios. Pintura a mano.
              <br />
              Hechos en Coyoacán, CDMX.
            </Typography>
          </Box>
          <Box component="nav" aria-label="Explorar desde el pie de página">
            <Typography component="h3" variant="overline" sx={{ color: colors.bone, mb: 2 }}>
              Explora
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {explore.map((link) => (
                <Box component="li" key={link.label}>
                  <MuiLink component={RouterLink} to={link.to} sx={footerLinkSx}>
                    <Typography variant="body2">{link.label}</Typography>
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography component="h3" variant="overline" sx={{ color: colors.bone, mb: 2 }}>
              En contacto
            </Typography>
            <MuiLink href={GALLERY_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" sx={footerLinkSx}>
              <Typography variant="body2">{brand.instagramHandle} ↗</Typography>
            </MuiLink>
            <Typography variant="body2" sx={{ mt: 1, maxWidth: 230 }}>
              {footer.location}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pt: 3,
            borderTop: `1px solid ${colors.inkSoft}`,
          }}
        >
          <Typography variant="overline">{footer.copyrightLine(new Date().getFullYear())}</Typography>
          <Button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              })
            }
            sx={{ color: colors.paper, border: `1px solid ${colors.inkSoft}`, px: 2, gap: 2 }}
          >
            Volver arriba{' '}
            <Box component="span" aria-hidden="true">
              ↑
            </Box>
          </Button>
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
