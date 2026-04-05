import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { appPaths } from '@/constants/paths'
import { GalleryLayout } from '@/features/gallery'
import GalleryHomePage from '@/features/gallery/pages/GalleryHomePage'
import NotFoundPage from '@/features/gallery/pages/NotFoundPage'
import SpecimenDetailPage from '@/features/gallery/pages/SpecimenDetailPage'
import { AppThemeProvider } from './theme/AppThemeProvider'

export default function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={appPaths.home} element={<GalleryLayout />}>
            <Route index element={<GalleryHomePage />} />
            <Route path={`${appPaths.specimenSegment}/:id`} element={<SpecimenDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  )
}
