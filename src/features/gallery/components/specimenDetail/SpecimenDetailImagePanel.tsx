import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ProtectedImage } from '@/components/ProtectedImage'
import { SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT } from '@/constants/galleryUi'
import type { Specimen } from '@/data/specimens'
import { vitrineSurfaceSx } from '@/theme/createAppTheme'

type SpecimenDetailImagePanelProps = {
  specimen: Specimen
}

export function SpecimenDetailImagePanel({ specimen }: SpecimenDetailImagePanelProps) {
  const theme = useTheme()
  const vitrine = vitrineSurfaceSx(theme.palette.mode)

  return (
    <Box
      sx={{
        ...vitrine,
        p: 2,
        position: { lg: 'sticky' },
        top: { lg: 96 },
        alignSelf: { lg: 'flex-start' },
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          maxHeight: SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'secondary.main',
          minHeight: 0,
        }}
      >
        <ProtectedImage
          src={specimen.image}
          alt={specimen.name}
          loading="eager"
          imageSx={{
            maxWidth: '100%',
            maxHeight: SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT,
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  )
}
