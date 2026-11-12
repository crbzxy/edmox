import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { CARD_IMAGE_ASPECT_RATIO } from '@/constants/galleryUi'
import { ProtectedImage } from '@/components/ProtectedImage'
import type { Specimen } from '@/data/specimens'
import { formatCatalogNumber, formatEdition, formatHeight, specimenImageAlt, splitSpecimenName } from '@/services/specimens/catalog'
import { SpecimenStatusTag } from './SpecimenStatusTag'

type SpecimenCardProps = {
  specimen: Specimen
}

/** Ficha de archivo: foto, número de catálogo, nombre y datos clave. Sin sombras ni efectos de “tarjeta”. */
export function SpecimenCard({ specimen }: SpecimenCardProps) {
  const { title, variant } = splitSpecimenName(specimen.name)
  const facts = [formatHeight(specimen.height), formatEdition(specimen.edition)].filter(Boolean)

  return (
    <Box
      component={RouterLink}
      to={appPaths.specimenDetail(specimen.id)}
      sx={{
        display: 'block',
        color: 'inherit',
        textDecoration: 'none',
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4 },
        '& .protected-image-media': { transition: 'transform 400ms cubic-bezier(0.2, 0, 0, 1)' },
        '&:hover .protected-image-media': { transform: 'scale(1.025)' },
        '&:hover .specimen-card-title': { color: 'primary.main' },
        '@media (prefers-reduced-motion: reduce)': {
          '&:hover .protected-image-media': { transform: 'none' },
        },
      }}
    >
      <Box sx={{ aspectRatio: CARD_IMAGE_ASPECT_RATIO, overflow: 'hidden', bgcolor: 'secondary.main' }}>
        <ProtectedImage
          src={specimen.image}
          srcSet={specimen.imageSrcSet}
          sizes="(min-width: 1280px) 284px, (min-width: 1200px) calc((100vw - 144px) / 4), (min-width: 600px) calc((100vw - 80px) / 2), calc(100vw - 32px)"
          alt={specimenImageAlt(specimen)}
          loading="lazy"
          wrapperSx={{ display: 'block', width: '100%', height: '100%' }}
          imageSx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          mt: 1.25,
          pt: 1,
          borderTop: '1.5px solid',
          borderColor: 'text.primary',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography variant="overline" color="text.secondary">
          {formatCatalogNumber(specimen.id)}
        </Typography>
        <SpecimenStatusTag status={specimen.status} />
      </Box>

      <Typography
        variant="h3"
        className="specimen-card-title"
        sx={{ mt: 1, fontSize: { xs: '1.75rem', md: '2rem' }, transition: 'color 150ms' }}
      >
        {title}
      </Typography>
      {variant && (
        <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 600 }}>
          {variant}
        </Typography>
      )}
      <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
        {facts.length > 0 ? facts.join(' · ') : specimen.material}
      </Typography>
    </Box>
  )
}
