import { Box } from '@mui/material'
import { ProtectedImage } from '@/components/ProtectedImage'
import { SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT } from '@/constants/galleryUi'
import type { Specimen } from '@/data/specimens'
import { specimenImageAlt } from '@/services/specimens/catalog'

type SpecimenDetailImagePanelProps = {
  specimen: Specimen
}

export function SpecimenDetailImagePanel({ specimen }: SpecimenDetailImagePanelProps) {
  return (
    <Box
      sx={{
        position: { md: 'sticky' },
        top: { md: 92 },
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'secondary.main',
      }}
    >
      <ProtectedImage
        src={specimen.image}
        srcSet={specimen.imageSrcSet}
        sizes="(min-width: 900px) 700px, calc(100vw - 32px)"
        alt={specimenImageAlt(specimen)}
        loading="eager"
        imageSx={{ maxWidth: '100%', maxHeight: SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT, objectFit: 'contain' }}
      />
    </Box>
  )
}
