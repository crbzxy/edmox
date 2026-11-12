import { AppBar, Box, Link as MuiLink, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import { GALLERY_INSTAGRAM_URL, SECTION_ABOUT_ID, SECTION_ARCHIVE_ID } from '@/constants/gallery'
import { appPaths, isGalleryArchivePath } from '@/constants/paths'
import { LOGO_CORNER_RADIUS_PX } from '@/theme/appColorTokens'
import { scrollGalleryAnchorIntoView } from '@/utils/scrollGalleryAnchor'
import { GalleryContentBounds } from './GalleryContentBounds'

function navLinkSx(active: boolean) {
  return {
    color: 'text.primary',
    textDecoration: 'underline',
    textDecorationThickness: '1.5px',
    textUnderlineOffset: '5px',
    textDecorationColor: active ? 'currentColor' : 'transparent',
    '&:hover': { textDecorationColor: 'currentColor' },
  } as const
}

export function GalleryNav() {
  const location = useLocation()
  const { brand, nav } = galleryCopy

  const isAboutActive = location.pathname === appPaths.home && location.hash === `#${SECTION_ABOUT_ID}`
  const isArchiveActive =
    isGalleryArchivePath(location.pathname) &&
    (location.pathname !== appPaths.home || location.hash === `#${SECTION_ARCHIVE_ID}`)

  const sectionLink = (id: string, label: string, active: boolean) => (
    <MuiLink
      component={RouterLink}
      to={{ pathname: appPaths.home, hash: id }}
      onClick={() => {
        if (location.pathname === appPaths.home && location.hash === `#${id}`) {
          scrollGalleryAnchorIntoView(id)
        }
      }}
      aria-current={active ? 'location' : undefined}
      sx={navLinkSx(active)}
    >
      <Typography variant="overline">{label}</Typography>
    </MuiLink>
  )

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar disableGutters sx={{ minHeight: { xs: 60, sm: 68 }, width: '100%' }}>
        <GalleryContentBounds
          sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}
        >
          <MuiLink
            component={RouterLink}
            to={appPaths.home}
            aria-label={brand.homeLinkAriaLabel}
            sx={{
              display: 'inline-flex',
              lineHeight: 0,
              borderRadius: `${LOGO_CORNER_RADIUS_PX}px`,
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4 },
            }}
          >
            <Logo alt="" size="nav" />
          </MuiLink>
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2.5, sm: 4 } }}>
            {sectionLink(SECTION_ARCHIVE_ID, nav.archive, isArchiveActive)}
            {sectionLink(SECTION_ABOUT_ID, nav.about, isAboutActive)}
            <MuiLink
              href={GALLERY_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ...navLinkSx(false), display: { xs: 'none', sm: 'inline' } }}
            >
              <Typography variant="overline">{nav.instagram} ↗</Typography>
            </MuiLink>
          </Box>
        </GalleryContentBounds>
      </Toolbar>
    </AppBar>
  )
}
