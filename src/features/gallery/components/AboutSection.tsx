import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { galleryCopy } from '@/content/galleryCopy'
import { SECTION_ABOUT_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { appPaths } from '@/constants/paths'
import { GalleryContentBounds } from './GalleryContentBounds'

const inlineLinkSx = {
  color: 'text.primary',
  textDecoration: 'underline',
  textDecorationThickness: '1px',
  textUnderlineOffset: '3px',
  '&:hover': { color: 'primary.main' },
} as const

function ProcessList() {
  const { about } = galleryCopy
  return (
    <Box>
      <Typography variant="overline" color="text.secondary" component="h3" sx={{ display: 'block', mb: 1.5 }}>
        {about.processTitle}
      </Typography>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {about.process.map((step, index) => (
          <Box
            component="li"
            key={step.title}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '2.5rem 1fr', sm: '3rem 9rem 1fr' },
              columnGap: 2,
              rowGap: 0.25,
              alignItems: 'baseline',
              py: 2,
              borderTop: '1px solid',
              borderColor: index === 0 ? 'text.primary' : 'divider',
            }}
          >
            <Typography variant="overline" color="primary">
              {String(index + 1).padStart(2, '0')}
            </Typography>
            <Typography variant="h3" component="span" sx={{ fontSize: '1.5rem' }}>
              {step.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ gridColumn: { xs: '2', sm: 'auto' } }}>
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export function AboutSection() {
  const { about } = galleryCopy
  return (
    <Box
      component="section"
      id={SECTION_ABOUT_ID}
      aria-labelledby="about-title"
      sx={{ pb: { xs: 10, md: 14 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}
    >
      <GalleryContentBounds>
        <Box sx={{ pt: 2, borderTop: '1.5px solid', borderColor: 'text.primary' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
              columnGap: { md: 8, lg: 12 },
              rowGap: 6,
            }}
          >
            <Box>
              <Typography id="about-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '4.5rem' } }}>
                {about.sectionTitle}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, maxWidth: 460 }}>
                {about.paragraph1}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 460 }}>
                {about.paragraph2}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 460 }}>
                {about.fauxfubi.before}
                <MuiLink href={about.fauxfubi.href} target="_blank" rel="noopener noreferrer" sx={inlineLinkSx}>
                  {about.fauxfubi.linkLabel}
                </MuiLink>
                {about.fauxfubi.after}
              </Typography>
              <MuiLink
                component={RouterLink}
                to={appPaths.links}
                sx={{ display: 'inline-block', mt: 3, ...inlineLinkSx }}
              >
                <Typography variant="overline">{about.linksCta} →</Typography>
              </MuiLink>
            </Box>
            <Box sx={{ pt: { md: 1 } }}>
              <ProcessList />
            </Box>
          </Box>
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
