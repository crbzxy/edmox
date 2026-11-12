import { Box, Link as MuiLink, Typography } from '@mui/material'
import { useEffect } from 'react'
import { galleryCopy } from '@/content/galleryCopy'
import { appPaths } from '@/constants/paths'
import { usePageMeta } from '@/hooks/usePageMeta'
import { GalleryContentBounds } from '../components/GalleryContentBounds'
import { GalleryFooter } from '../components/GalleryFooter'

export default function LinksPage() {
  const { links } = galleryCopy

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  usePageMeta({
    title: `${links.pageTitle} · Ediciones Mox`,
    description: links.metaDescription,
    path: appPaths.links,
  })

  return (
    <>
      <Box component="main" sx={{ pt: { xs: 12, sm: 15 }, pb: { xs: 10, md: 14 } }}>
        <GalleryContentBounds>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
              columnGap: { md: 8, lg: 12 },
              rowGap: 4,
            }}
          >
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '3.25rem', md: '4.75rem' } }}>
                {links.pageTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 3, maxWidth: 420 }}>
                {links.intro}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {links.groups.map((group) => (
                <Box component="section" key={group.title}>
                  <Typography variant="overline" component="h2" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                    {group.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: '1.5px solid', borderColor: 'text.primary' }}>
                    {group.items.map((item) => (
                      <Box component="li" key={item.href} sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <MuiLink
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: 'text.primary', overflowWrap: 'anywhere', '&:hover': { color: 'primary.main' } }}
                        >
                          <Typography variant="h3" component="span" sx={{ fontSize: { xs: '1.375rem', md: '1.625rem' } }}>
                            {item.name} ↗
                          </Typography>
                        </MuiLink>
                        <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                          {item.source}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, maxWidth: 560 }}>
                          {item.note}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </GalleryContentBounds>
      </Box>
      <GalleryFooter />
    </>
  )
}
