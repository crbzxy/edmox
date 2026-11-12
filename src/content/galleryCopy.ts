import type { Specimen } from '@/data/specimens'

const brandShortName = 'Ediciones Mox'

/**
 * Textos de la galería (español). Modificar solo aquí para cambiar copy en toda la UI.
 * Los datos de catálogo (nombres, descripciones de piezas) siguen en {@link @/data/specimens}.
 */

export const galleryCopy = {
  brand: {
    shortName: brandShortName,
    instagramHandle: '@edicionesmox',
    /** Alt del logo en pie u otros usos con texto. */
    logoAlt: brandShortName,
    homeLinkAriaLabel: `${brandShortName} — inicio`,
  },

  nav: {
    archive: 'Archivo',
    about: 'Taller',
    events: 'Eventos',
    instagram: 'Instagram',
  },

  hero: {
    eyebrow: 'Juguetes de autor',
    title: 'Monstruos de aquí. Hechos a mano.',
    description: 'Personajes propios, pintura a mano y tirajes cortos. Del taller en Coyoacán a tu colección.',
    metaLine: (pieceCount: number) => [
      `${String(pieceCount).padStart(2, '0')} piezas en archivo`,
      'Taller desde 2026',
      'CDMX',
    ],
    archiveCta: 'Ver el archivo',
    featuredImageAlt: 'Vitrina con figuras de Ediciones Mox: CHUPALINAS, GOLDITOS y ZURASHI',
    featuredCaption: 'Vitrina, temporada 2026. CHUPALINAS, GOLDITOS y ZURASHI.',
  },

  archive: {
    sectionTitle: 'Archivo',
    filterGroupAriaLabel: 'Filtrar por estado',
    countLabel: (pieceCount: number) => `${String(pieceCount).padStart(2, '0')} piezas`,
    loadMore: 'Mostrar más piezas',
    empty: 'No hay piezas con este estado por ahora.',
  },

  about: {
    sectionTitle: 'El taller',
    paragraph1: `${brandShortName} es un taller chico en Coyoacán, CDMX, que empezó en 2026. Hacemos personajes propios y, de vez en cuando, piezas en colaboración con otros artistas; cuando es así, lo decimos.`,
    paragraph2:
      'Hacemos esculturas de resina y personajes con impresión 3D, pintados a mano en tirajes cortos. El material y la edición cambian según la pieza; los indicamos en cada ficha.',
    /** Párrafo con cita: texto antes del enlace, enlace y texto después. */
    fauxfubi: {
      before:
        'Hacemos algo más parecido a un fauxfubi: figuras con espíritu de sofubi hechas por otros caminos. Tomamos la palabra de trabajos como ',
      linkLabel: 'el de thecrafsman en Crafnation',
      href: 'https://crafnation.com/from-sketch-to-sculpt-to-soft-resin-fauxfubi-diy-sofubi-at-home/',
      after: ', que enseña a hacerlas en casa con resina suave; nosotros lo resolvemos con impresión 3D.',
    },
    linksCta: 'Sitios de interés',
    processTitle: 'Cómo se hace una pieza',
    process: [
      { title: 'Escultura', description: 'Diseñamos y esculpimos el personaje en el taller.' },
      { title: 'Producción', description: 'Resina o impresión 3D, según el personaje y su edición.' },
      { title: 'Pintura', description: 'Base a pincel y degradados con aerógrafo, en varias capas.' },
      { title: 'Edición', description: 'Cada pieza forma parte de un tiraje con sus propios materiales y acabados.' },
    ] as const,
  },

  footer: {
    ctaTitle: '¿Te interesa una pieza?',
    ctaBody: 'Preventas, disponibilidad y envíos los vemos por mensaje directo.',
    instagramCta: 'Escríbenos en Instagram',
    location: 'Coyoacán, Ciudad de México',
    copyrightLine: (year: number) => `© ${year} ${brandShortName}`,
  },

  specimenDetail: {
    backToArchive: 'Archivo',
    backArrow: '←',
    notFoundMessage: 'No encontramos esta pieza en el archivo.',
    inquireCta: 'Preguntar por esta pieza',
    soldNote: 'Tiraje agotado. Síguenos en Instagram para enterarte de la siguiente edición.',
    previous: 'Anterior',
    next: 'Siguiente',
    metaLabels: {
      artist: 'Autoría',
      material: 'Material',
      height: 'Altura',
      origin: 'Hecho en',
      year: 'Año',
      edition: 'Edición',
      status: 'Estado',
    } as const,
  },

  specimenStatus: {
    available: 'Disponible',
    sold: 'Agotado',
    'pre-order': 'Preventa',
  } satisfies Record<NonNullable<Specimen['status']>, string>,

  links: {
    pageTitle: 'Sitios de interés',
    intro:
      'Lecturas, talleres y gente que nos ha enseñado algo sobre juguetes de autor, sofubi y lo que hacemos por aquí. No tenemos relación comercial con ninguno, salvo donde se dice.',
    metaDescription:
      'Enlaces que recomienda Ediciones Mox sobre fauxfubi, historia del sofubi y el art toy, cultura popular mexicana y artistas con los que colaboramos.',
    groups: [
      {
        title: 'Fauxfubi y técnica',
        items: [
          {
            name: 'From Sketch to Sculpt to Soft Resin (Fauxfubi — DIY Sofubi at home)',
            source: 'Crafnation · thecrafsman · 3 de marzo de 2024',
            href: 'https://crafnation.com/from-sketch-to-sculpt-to-soft-resin-fauxfubi-diy-sofubi-at-home/',
            note: 'Cómo hacer figuras estilo sofubi en casa: escultura, resina suave rotomoldeada y pintura. De aquí tomamos la palabra fauxfubi.',
          },
        ],
      },
      {
        title: 'Historia del sofubi y el art toy',
        items: [
          {
            name: 'Max Toy Company',
            source: 'maxtoyco.com',
            href: 'https://www.maxtoyco.com/',
            note: 'Estudio de Mark Nagata en San Francisco (2005–2026): kaiju de sofubi hechos en talleres japoneses, pintados a mano y en tirajes cortos.',
          },
          {
            name: 'Kaiju vs Heroes: Mark Nagata’s Journey through the World of Japanese Toys',
            source: 'Japanese American National Museum',
            href: 'https://janm.org/exhibits/kaiju-vs-heroes/artist',
            note: 'La exposición que llevó el juguete kaiju a un museo y lo leyó como memoria e identidad.',
          },
        ],
      },
      {
        title: 'Cultura popular mexicana',
        items: [
          {
            name: 'Judas con forma de diablo',
            source: 'México Desconocido',
            href: 'https://www.mexicodesconocido.com.mx/judas-con-forma-de-diablo.html',
            note: 'La tradición de cartonería de la que sale nuestro Diablito Sanjuditas.',
          },
        ],
      },
      {
        title: 'Colaboraciones',
        items: [
          {
            name: 'Gabriela Sandoval (@gabosanrex)',
            source: 'Instagram',
            href: 'https://www.instagram.com/gabosanrex/',
            note: 'Artista con quien hicimos Tamaluchi.',
          },
        ],
      },
    ],
  },

  notFound: {
    title: '404',
    description: 'Esta página no existe, o se movió de vitrina.',
    cta: 'Volver al inicio',
  },
} as const

export type ArchiveStatusFilter = 'all' | NonNullable<Specimen['status']>

/** Orden y etiquetas del filtro del archivo. */
export const archiveStatusFilterOptions: { value: ArchiveStatusFilter; label: string }[] = [
  { value: 'all', label: 'Todo' },
  { value: 'available', label: galleryCopy.specimenStatus.available },
  { value: 'pre-order', label: galleryCopy.specimenStatus['pre-order'] },
  { value: 'sold', label: galleryCopy.specimenStatus.sold },
]

export const defaultArchiveStatusFilter: ArchiveStatusFilter = 'all'
