import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ABOUT_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { appPaths } from '@/constants/paths'
import { brandPalette as colors } from '@/theme/appColorTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

const linkSx = {
  color: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
  '&:hover': { color: colors.white },
} as const

export function AboutSection() {
  const { about } = galleryCopy
  return (
    <Box
      component="section"
      id={SECTION_ABOUT_ID}
      aria-labelledby="about-title"
      sx={{ bgcolor: colors.ink, color: colors.paper, scrollMarginTop: SECTION_SCROLL_MARGIN }}
    >
      <Box sx={{ bgcolor: colors.red, color: colors.white, py: 2.5, borderBlock: `1px solid ${colors.ink}` }}>
        <GalleryContentBounds
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
        >
          {['Diseño propio', 'Pintura a mano', 'Tirajes cortos'].map((item) => (
            <Typography key={item} variant="h3" sx={{ fontSize: { xs: '1.1rem', md: '1.65rem' } }}>
              <Box component="span" aria-hidden="true" sx={{ mr: 1.5 }}>
                ✳
              </Box>
              {item}
            </Typography>
          ))}
        </GalleryContentBounds>
      </Box>
      <GalleryContentBounds sx={{ py: { xs: 8, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
            gap: { xs: 5, md: 10 },
            mb: 7,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ display: 'block', mb: 3 }}>
              Detrás de las figuras / El taller
            </Typography>
            <Typography
              id="about-title"
              variant="h2"
              sx={{ fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' }, lineHeight: 0.95 }}
            >
              De aquí.
              <br />
              <Box
                component="span"
                sx={{ color: colors.paper, display: 'inline-block', borderBottom: `6px solid ${colors.red}` }}
              >
                A tu vitrina.
              </Box>
            </Typography>
          </Box>
          <Box sx={{ pt: { md: 5 } }}>
            <Typography variant="body1" sx={{ maxWidth: 520 }}>
              {about.paragraph1}
            </Typography>
            <Box
              component="details"
              sx={{
                mt: 3,
                borderBlock: '1px solid',
                borderColor: colors.inkSoft,
                py: 2,
                '& summary': { cursor: 'pointer', fontWeight: 700 },
                '& summary:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4 },
              }}
            >
              <Box component="summary">Nuestra forma de hacer figuras</Box>
              <Typography variant="body2" sx={{ mt: 2, color: colors.bone }}>
                {about.paragraph2}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: colors.bone }}>
                {about.fauxfubi.before}
                <MuiLink href={about.fauxfubi.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                  {about.fauxfubi.linkLabel}
                </MuiLink>
                {about.fauxfubi.after}
              </Typography>
            </Box>
            <MuiLink component={RouterLink} to={appPaths.links} sx={{ ...linkSx, display: 'inline-block', mt: 3 }}>
              <Typography variant="overline">{about.linksCta} ↗</Typography>
            </MuiLink>
          </Box>
        </Box>
        <Typography component="h3" variant="overline" sx={{ mb: 3 }}>
          {about.processTitle}
        </Typography>
        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
            borderTop: `1px solid ${colors.inkSoft}`,
            borderLeft: `1px solid ${colors.inkSoft}`,
          }}
        >
          {about.process.map((step, index) => (
            <Box
              component="li"
              key={step.title}
              sx={{ p: 3, borderRight: `1px solid ${colors.inkSoft}`, borderBottom: `1px solid ${colors.inkSoft}` }}
            >
              <Typography
                aria-hidden="true"
                sx={{ fontSize: '3.5rem', fontWeight: 850, lineHeight: 1, color: colors.redEmphasis, mb: 4 }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h3" component="h4" sx={{ fontSize: '1.65rem', mb: 1.5 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.bone }}>
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
