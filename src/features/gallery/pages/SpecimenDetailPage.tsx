import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSpecimenByParamId } from '@/hooks/useSpecimenByParamId'
import { GalleryContentBounds } from '../components/GalleryContentBounds'
import { GalleryFooter } from '../components/GalleryFooter'
import { SpecimenDetailBackLink } from '../components/specimenDetail/SpecimenDetailBackLink'
import { SpecimenDetailImagePanel } from '../components/specimenDetail/SpecimenDetailImagePanel'
import { SpecimenDetailMetaPanel } from '../components/specimenDetail/SpecimenDetailMetaPanel'
import { SpecimenDetailMissing } from '../components/specimenDetail/SpecimenDetailMissing'
import { SpecimenDetailPager } from '../components/specimenDetail/SpecimenDetailPager'
import { SpecimenPageMeta } from '../components/specimenDetail/SpecimenPageMeta'

export default function SpecimenDetailPage() {
  const specimen = useSpecimenByParamId()

  // Al pasar de una ficha a otra con el paginador, empezar arriba.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [specimen?.id])

  if (!specimen) {
    return <SpecimenDetailMissing />
  }

  return (
    <>
      <SpecimenPageMeta specimen={specimen} />
      <Box sx={{ pt: { xs: 13, sm: 16 }, pb: { xs: 14, md: 18 } }}>
        <GalleryContentBounds>
          <SpecimenDetailBackLink />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
              columnGap: { md: 6, lg: 8 },
              rowGap: 4,
              alignItems: 'start',
            }}
          >
            <SpecimenDetailImagePanel specimen={specimen} />
            <SpecimenDetailMetaPanel specimen={specimen} />
          </Box>
          <SpecimenDetailPager specimenId={specimen.id} />
        </GalleryContentBounds>
      </Box>
      <GalleryFooter />
    </>
  )
}
