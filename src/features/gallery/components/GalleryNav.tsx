import { AppBar, Box, Link as MuiLink, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ABOUT_ID, SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { appPaths, isGalleryArchivePath } from '@/constants/paths'
import { LOGO_CORNER_RADIUS_PX } from '@/theme/appColorTokens'
import { scrollGalleryAnchorIntoView } from '@/utils/scrollGalleryAnchor'
import { GalleryContentBounds } from './GalleryContentBounds'

function isAboutNavActive(pathname: string, hash: string) {
  return pathname === appPaths.home && hash === `#${SECTION_ABOUT_ID}`
}

export function GalleryNav() {
  const location = useLocation()
  const { brand, nav } = galleryCopy

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 64, sm: 72 },
          py: 1.5,
          width: '100%',
        }}
      >
        <GalleryContentBounds
          sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}
        >
          <MuiLink
            component={RouterLink}
            to={appPaths.home}
            aria-label={brand.homeLinkAriaLabel}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 0,
              borderRadius: `${LOGO_CORNER_RADIUS_PX}px`,
              opacity: 1,
              transition: 'opacity 200ms cubic-bezier(0.2, 0, 0, 1), transform 200ms cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { opacity: 0.92, transform: 'scale(1.02)' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4 },
            }}
          >
            <Logo alt="" size="nav" />
          </MuiLink>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, sm: 4 } }}>
            <MuiLink
              component={RouterLink}
              to={{ pathname: appPaths.home, hash: SECTION_ARCHIVE_ID }}
              onClick={() => {
                if (location.pathname === appPaths.home && location.hash === `#${SECTION_ARCHIVE_ID}`) {
                  scrollGalleryAnchorIntoView(SECTION_ARCHIVE_ID)
                }
              }}
              sx={{
                color: isGalleryArchivePath(location.pathname) ? 'primary.main' : 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Typography variant="overline">{nav.archive}</Typography>
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to={{ pathname: appPaths.home, hash: SECTION_ABOUT_ID }}
              onClick={() => {
                if (location.pathname === appPaths.home && location.hash === `#${SECTION_ABOUT_ID}`) {
                  scrollGalleryAnchorIntoView(SECTION_ABOUT_ID)
                }
              }}
              sx={{
                color: isAboutNavActive(location.pathname, location.hash) ? 'primary.main' : 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Typography variant="overline">{nav.about}</Typography>
            </MuiLink>
          </Box>
        </GalleryContentBounds>
      </Toolbar>
    </AppBar>
  )
}
