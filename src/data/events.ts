import { responsiveImage, type ResponsiveImage } from '@/data/responsiveImages'

export type GalleryEvent = {
  id: string
  name: string
  startDate: string
  endDate?: string
  dateLabel: string
  venue: string
  location: string
  description: string
  poster: ResponsiveImage
  sourceUrl: string
}

/** Fechas y sedes transcritas de los carteles originales, no de la fecha de publicación. */
export const galleryEvents: GalleryEvent[] = [
  {
    id: 'geometra-2026',
    name: 'Geómetra',
    startDate: '2026-07-11',
    endDate: '2026-07-12',
    dateLabel: '11–12 julio 2026',
    venue: 'Lerdo de Tejada 3, Col. Del Carmen',
    location: 'Coyoacán, Ciudad de México',
    description:
      'Bazar de arte, diseño y autopublicación. El taller anunció su participación en esta edición de julio.',
    poster: responsiveImage('event-geometra-2026'),
    sourceUrl: 'https://www.instagram.com/edicionesmox/p/DanQ0u4xUDC/',
  },
  {
    id: 'bwookshop-2026',
    name: 'BWookshop Vol. II',
    startDate: '2026-07-09',
    dateLabel: '09 julio 2026',
    venue: 'Hall West, Rijksakademie',
    location: 'Rijksakademie van Beeldende Kunsten',
    description:
      'Encuentro organizado por Biquini Wax EPS en torno a publicaciones, arte y economías colectivas. Ediciones Mox forma parte de la lista de participantes del cartel.',
    poster: responsiveImage('event-bwookshop-2026'),
    sourceUrl: 'https://www.instagram.com/biquiniwax_tv/p/DaacTdaNHyL/',
  },
]
