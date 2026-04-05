import { Box, Button, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { appPaths } from '@/constants/paths'
import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const location = useLocation()
  const { notFound } = galleryCopy

  useEffect(() => {
    console.error('404: ruta inexistente:', location.pathname)
  }, [location.pathname])

  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'secondary.main',
        px: 2,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          {notFound.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {notFound.description}
        </Typography>
        <Button component={RouterLink} to={appPaths.home} variant="outlined" color="primary" size="large">
          {notFound.cta}
        </Button>
      </Box>
    </Box>
  )
}
