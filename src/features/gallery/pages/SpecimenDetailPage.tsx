import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSpecimenByParamId } from '@/hooks/useSpecimenByParamId'
import { GalleryContentBounds } from '../components/GalleryContentBounds'
import { SpecimenDetailBackLink } from '../components/specimenDetail/SpecimenDetailBackLink'
import { SpecimenDetailImagePanel } from '../components/specimenDetail/SpecimenDetailImagePanel'
import { SpecimenDetailMetaPanel } from '../components/specimenDetail/SpecimenDetailMetaPanel'
import { SpecimenDetailMissing } from '../components/specimenDetail/SpecimenDetailMissing'

export default function SpecimenDetailPage() {
  const specimen = useSpecimenByParamId()

  if (!specimen) {
    return <SpecimenDetailMissing />
  }

  return (
    <Box sx={{ pt: { xs: 10, sm: 12 }, pb: { xs: 12, md: '15vh' } }}>
      <GalleryContentBounds>
        <SpecimenDetailBackLink />
        <Grid container spacing={{ xs: 4, lg: 8 }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <SpecimenDetailImagePanel specimen={specimen} />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <SpecimenDetailMetaPanel specimen={specimen} />
          </Grid>
        </Grid>
      </GalleryContentBounds>
    </Box>
  )
}
