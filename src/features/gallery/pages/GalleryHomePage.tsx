import { useGalleryHomeHashScroll } from '@/hooks/useGalleryHomeHashScroll'
import { AboutSection } from '../components/AboutSection'
import { ArchiveGrid } from '../components/ArchiveGrid'
import { GalleryFooter } from '../components/GalleryFooter'
import { HeroSection } from '../components/HeroSection'
import { EventsSection } from '../components/EventsSection'

export default function GalleryHomePage() {
  useGalleryHomeHashScroll()

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
