import { useGalleryHomeHashScroll } from '@/hooks/useGalleryHomeHashScroll'
import { usePageMeta } from '@/hooks/usePageMeta'
import { homePageMeta } from '@/seo/pageMeta'
import { AboutSection } from '../components/AboutSection'
import { ArchiveGrid } from '../components/ArchiveGrid'
import { GalleryFooter } from '../components/GalleryFooter'
import { HeroSection } from '../components/HeroSection'
import { EventsSection } from '../components/EventsSection'

export default function GalleryHomePage() {
  useGalleryHomeHashScroll()
  usePageMeta(homePageMeta())

  return (
    <>
      <HeroSection />
      <ArchiveGrid />
      <AboutSection />
      <EventsSection />
      <GalleryFooter />
    </>
  )
}
