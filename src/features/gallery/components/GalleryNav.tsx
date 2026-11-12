import { AppBar, Box, Button, Drawer, Link as MuiLink, Toolbar, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { galleryCopy } from '@/content/galleryCopy'
import {
  GALLERY_HEADER_HEIGHT,
  GALLERY_INSTAGRAM_URL,
  SECTION_ABOUT_ID,
  SECTION_ARCHIVE_ID,
  SECTION_EVENTS_ID,
} from '@/constants/gallery'
import { appPaths, isGalleryArchivePath } from '@/constants/paths'
import { LOGO_CORNER_RADIUS_PX } from '@/theme/appColorTokens'
import { ui } from '@/theme/uiTokens'
import { scrollGalleryAnchorIntoView } from '@/utils/scrollGalleryAnchor'
import { GalleryContentBounds } from './GalleryContentBounds'

export function GalleryNav() {
  const location = useLocation()
  const { brand, nav } = galleryCopy
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const open = openedAt === location.key
  const close = () => setOpenedAt(null)

  useEffect(() => {
    const onResize = () => setOpenedAt(null)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    {
      label: nav.archive,
      to: { pathname: appPaths.home, hash: SECTION_ARCHIVE_ID },
      active:
        isGalleryArchivePath(location.pathname) &&
        (location.pathname !== appPaths.home || location.hash === `#${SECTION_ARCHIVE_ID}`),
      anchor: SECTION_ARCHIVE_ID,
    },
    {
      label: nav.about,
      to: { pathname: appPaths.home, hash: SECTION_ABOUT_ID },
      active: location.pathname === appPaths.home && location.hash === `#${SECTION_ABOUT_ID}`,
      anchor: SECTION_ABOUT_ID,
    },
    {
      label: nav.events,
      to: { pathname: appPaths.home, hash: SECTION_EVENTS_ID },
      active: location.pathname === appPaths.home && location.hash === `#${SECTION_EVENTS_ID}`,
      anchor: SECTION_EVENTS_ID,
    },
    {
      label: galleryCopy.links.pageTitle,
      to: { pathname: appPaths.links },
      active: location.pathname === appPaths.links,
    },
  ]

  const follow = (anchor?: string) => {
    close()
    if (anchor && location.pathname === appPaths.home && location.hash === `#${anchor}`)
      scrollGalleryAnchorIntoView(anchor)
  }

  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar disableGutters sx={{ minHeight: GALLERY_HEADER_HEIGHT, width: '100%' }}>
          <GalleryContentBounds
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}
          >
            <MuiLink
              component={RouterLink}
              to={appPaths.home}
              onClick={close}
              aria-label={brand.homeLinkAriaLabel}
              sx={{ display: 'inline-flex', lineHeight: 0, borderRadius: `${LOGO_CORNER_RADIUS_PX}px` }}
            >
              <Logo alt="" size="nav" />
            </MuiLink>
            <Box
              component="nav"
              aria-label={nav.mainAriaLabel}
              sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 4 }}
            >
              {links.map((link) => (
                <MuiLink
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  onClick={() => follow(link.anchor)}
                  aria-current={link.active ? 'page' : undefined}
                  sx={{
                    color: 'text.primary',
                    py: 1.5,
                    borderBottom: '2px solid',
                    borderColor: link.active ? 'accent.text' : 'transparent',
                    '&:hover': { borderColor: 'accent.text' },
                  }}
                >
                  <Typography variant="overline">{link.label}</Typography>
                </MuiLink>
              ))}
              <MuiLink
                href={GALLERY_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.primary', py: 1.5 }}
              >
                <Typography variant="overline">{nav.instagram} ↗</Typography>
              </MuiLink>
            </Box>
            <Button
              ref={menuButton}
              aria-label={nav.openMenuAriaLabel}
              aria-expanded={open}
              aria-controls={open ? 'mobile-navigation' : undefined}
              aria-haspopup="dialog"
              onClick={() => setOpenedAt(location.key)}
              sx={{
                display: { xs: 'flex', lg: 'none' },
                gap: 2,
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'divider',
                px: 2,
                py: 1,
                minHeight: 44,
              }}
            >
              <Typography variant="overline">{nav.menuLabel}</Typography>
              <Box aria-hidden="true" sx={{ display: 'grid', gap: '5px', width: 20 }}>
                <Box sx={{ height: 2, bgcolor: 'currentColor' }} />
                <Box sx={{ height: 2, bgcolor: 'currentColor' }} />
              </Box>
            </Button>
          </GalleryContentBounds>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        slotProps={{
          paper: {
            id: 'mobile-navigation',
            role: 'dialog',
            'aria-modal': true,
            'aria-label': nav.drawerAriaLabel,
            sx: {
              width: { xs: '100%', sm: 440 },
              maxWidth: '100%',
              bgcolor: ui.surface,
              color: ui.ink,
              p: { xs: 3, sm: 4 },
              display: 'flex',
              borderLeft: `1px solid ${ui.ink}`,
            },
          },
          transition: {
            onExited: () => {
              if (menuButton.current?.getClientRects().length) menuButton.current.focus()
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, pb: 4 }}>
          <Typography variant="overline">{nav.drawerEyebrow}</Typography>
          <Button
            autoFocus
            onClick={close}
            aria-label={nav.closeMenuAriaLabel}
            sx={{ color: ui.ink, border: `1px solid ${ui.ink}`, minWidth: 44, px: 1.5 }}
          >
            {nav.closeMenuLabel}{' '}
            <Box component="span" aria-hidden="true" sx={{ ml: 1, fontSize: 24 }}>
              ×
            </Box>
          </Button>
        </Box>
        <Typography variant="h2" sx={{ fontSize: '3.5rem', my: 3 }}>
          {nav.drawerTitle}
          <Box component="span" sx={{ color: ui.accentText }}>
            {' '}
            {nav.drawerTitleAccent}
          </Box>
        </Typography>
        <Box component="nav" aria-label={nav.mobileNavAriaLabel} sx={{ mt: 2 }}>
          {links.map((link, index) => (
            <MuiLink
              key={link.label}
              component={RouterLink}
              to={link.to}
              onClick={() => follow(link.anchor)}
              aria-current={link.active ? 'page' : undefined}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 3,
                color: link.active ? ui.accentText : ui.ink,
                borderTop: `1px solid ${ui.inkSoft}`,
                '&:hover': { color: ui.accentText },
              }}
            >
              <Typography variant="overline">0{index + 1}</Typography>
              <Typography variant="h3" sx={{ fontSize: '1.9rem', flex: 1 }}>
                {link.label}
              </Typography>
              <Box aria-hidden="true">↗</Box>
            </MuiLink>
          ))}
        </Box>
        <Box sx={{ mt: 'auto', pt: 5 }}>
          <Button
            href={GALLERY_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            fullWidth
            sx={{ bgcolor: ui.accent, color: ui.onAccent, '&:hover': { bgcolor: ui.accentHover } }}
          >
            Instagram ↗
          </Button>
          <Typography variant="overline" sx={{ display: 'block', mt: 3 }}>
            {galleryCopy.footer.location}
          </Typography>
        </Box>
      </Drawer>
    </>
  )
}
