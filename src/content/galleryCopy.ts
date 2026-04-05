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
    featuredCaption: 'Vitrinas de la galería — Temporada 2024',
    featuredImageAlt: 'Colección de sofubi kaiju en vitrina de galería',
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
    paragraph1: `${brandShortName} nace de la pasión por el soft vinyl japonés — una forma de arte que fusiona la escultura tradicional con la cultura pop contemporánea. Desde kaijus clásicos hasta criaturas de diseñador, cada pieza en nuestro archivo representa lo mejor del coleccionismo independiente.`,
    paragraph2:
      'Fundada en 2024, nuestra misión es documentar, preservar y compartir estas obras con la comunidad global de coleccionistas. Trabajamos directamente con artistas y estudios de Japón, Hong Kong y más allá para traer ediciones exclusivas.',
    stats: [
      { value: '150+', label: 'Piezas documentadas' },
      { value: '30+', label: 'Artistas colaboradores' },
      { value: '12', label: 'Países de origen' },
      { value: '2024', label: 'Año de fundación' },
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
    instagram: 'Instagram',
    contact: 'Contacto',
    copyrightLine: (year: number) => `© ${year} ${brandShortName}. Todos los derechos reservados.`,
  },

  specimenDetail: {
    backToArchive: 'Volver al archivo',
    backArrow: '←',
    notFoundMessage: 'No encontramos esta pieza en el archivo.',
    pieceIdOverline: (specimenId: string) => `Pieza ${specimenId.toUpperCase()}`,
    inquireCta: 'Consultar por esta pieza →',
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
  { value: 'GID Vinyl', label: 'GID Vinyl' },
  { value: 'Painted Vinyl', label: 'Painted Vinyl' },
  { value: 'Clear Red Vinyl', label: 'Clear Red Vinyl' },
  { value: 'Clear Orange Vinyl', label: 'Clear Orange Vinyl' },
] as const

export type ArchiveMaterialFilter = (typeof archiveMaterialFilterOptions)[number]['value']

export const defaultArchiveMaterialFilter: ArchiveMaterialFilter = 'All'
