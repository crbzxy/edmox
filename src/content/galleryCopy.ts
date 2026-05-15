import type { Specimen } from '@/data/specimens'

const brandShortName = 'Ediciones Mox'

/**
 * Textos de la galería (español). Modificar solo aquí para cambiar copy en toda la UI.
 * Los datos de catálogo (nombres, descripciones de piezas) siguen en {@link @/data/specimens}.
 */

export const galleryCopy = {
  brand: {
    shortName: brandShortName,
    /** Alt del logo en pie u otros usos con texto. */
    logoAlt: brandShortName,
    homeLinkAriaLabel: `${brandShortName} — inicio`,
  },

  nav: {
    archive: 'Archivo',
    about: 'Sobre',
  },

  hero: {
    eyebrow: 'Archivo de soft vinyl',
    titleLine1: 'Ediciones',
    titleAccent: 'Mox',
    description:
      'Una colección curada de figuras japonesas de soft vinyl (sofubi). Cada pieza documentada con precisión de archivo — desde kaijus GID hasta ediciones limitadas pintadas a mano.',
    scrollHint: 'Desplázate para explorar',
    featuredOverline: 'Colección destacada',
    featuredCaption: 'Vitrinas de la galería — Temporada 2026',
    featuredImageAlt: 'Vitrina de piezas Ediciones Mox — kaiju y art toys en exhibición',
  },

  archive: {
    sectionTitle: 'La colección',
    filterGroupAriaLabel: 'Filtrar por material',
    sectionOverline: (pieceCount: number) => `Archivo — ${pieceCount} piezas`,
  },

  about: {
    overline: 'Sobre nosotros',
    titleLine1: 'La galería virtual',
    titleLine2Before: 'de ',
    titleAccent: 'sofubi',
    paragraph1: `${brandShortName} nace en Coyoacán, CDMX, de la pasión por el kaiju y el art toy independiente — escultura, impresión 3D en PLA y acabado pintado a mano con estética sofubi.`,
    paragraph2:
      'Fundada en 2026, documentamos y compartimos cada edición limitada desde nuestro taller en la Ciudad de México. Cada pieza del archivo es diseño propio, producción artesanal y tirajes numerados.',
    stats: [
      { value: '0', label: 'Piezas documentadas' },
      { value: 'Coyoacán', label: 'Sede del taller' },
      { value: 'CDMX', label: 'Ciudad de origen' },
      { value: '2026', label: 'Año de fundación' },
    ] as const,
    valuesTitle: 'Nuestros valores',
    values: [
      {
        title: 'Autenticidad',
        description: 'Solo piezas verificadas y originales de fabricantes autorizados.',
      },
      {
        title: 'Preservación',
        description: 'Documentación fotográfica y técnica de nivel archivístico.',
      },
      {
        title: 'Comunidad',
        description: 'Conectamos coleccionistas con artistas y estudios independientes.',
      },
    ] as const,
  },

  footer: {
    instagramCta: 'Escríbenos en Instagram →',
    copyrightLine: (year: number) => `© ${year} ${brandShortName}. Todos los derechos reservados.`,
  },

  specimenDetail: {
    backToArchive: 'Volver al archivo',
    backArrow: '←',
    notFoundMessage: 'No encontramos esta pieza en el archivo.',
    pieceIdOverline: (specimenId: string) => `Pieza ${specimenId.toUpperCase()}`,
    inquireCta: 'Consultar en Instagram →',
    metaLabels: {
      material: 'Material',
      height: 'Altura',
      origin: 'Origen',
      year: 'Año',
      edition: 'Edición',
      status: 'Estado',
    } as const,
  },

  specimenStatus: {
    available: 'Disponible',
    sold: 'Vendido',
    'pre-order': 'Preventa',
  } satisfies Record<Specimen['status'], string>,

  notFound: {
    title: '404',
    description: 'No encontramos la página que buscas.',
    cta: 'Volver al inicio',
  },
} as const

/** Valores de filtro = `specimen.material` salvo `All`. La etiqueta es lo que ve el usuario. */
export const archiveMaterialFilterOptions = [
  { value: 'All', label: 'Todos' },
  { value: 'PLA pintado', label: 'PLA pintado' },
] as const

export type ArchiveMaterialFilter = (typeof archiveMaterialFilterOptions)[number]['value']

export const defaultArchiveMaterialFilter: ArchiveMaterialFilter = 'All'
