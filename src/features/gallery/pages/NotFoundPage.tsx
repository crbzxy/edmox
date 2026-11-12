import { Box, Button, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { appPaths } from '@/constants/paths'
import { usePageMeta } from '@/hooks/usePageMeta'
import { notFoundPageMeta } from '@/seo/pageMeta'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const location = useLocation()
  const { notFound } = galleryCopy

  usePageMeta(notFoundPageMeta(location.pathname))

  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '6rem', md: '9rem' }, color: 'accent.text' }}>
          {notFound.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {notFound.description}
        </Typography>
        <Button
          component={RouterLink}
          to={appPaths.home}
          variant="outlined"
          size="large"
          sx={{ color: 'accent.text', borderColor: 'accent.text', '&:hover': { borderColor: 'accent.text' } }}
        >
          {notFound.cta}
        </Button>
      </Box>
    </Box>
  )
}
