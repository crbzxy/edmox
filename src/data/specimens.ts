import specimensJson from '@/data/specimens.json'
import { responsiveImage } from '@/data/responsiveImages'

export type Specimen = {
  id: string
  name: string
  artist: string
  year: number
  material: string
  height?: string
  origin?: string
  image: string
  imageSrcSet: string
  sourceUrl?: string
  description: string
  edition?: string
  status?: 'available' | 'sold' | 'pre-order'
  /** Pieza hecha con otra persona artista: muestra la insignia "Colaboración". */
  collaboration?: boolean
}

type SpecimenJson = Omit<Specimen, 'image' | 'imageSrcSet'> & { imageFile: string }

export const specimens: Specimen[] = (specimensJson as SpecimenJson[]).map((item) => ({
  id: item.id,
  name: item.name,
  artist: item.artist,
  sourceUrl: item.sourceUrl,
  year: item.year,
  material: item.material,
  height: item.height,
  origin: item.origin,
  image: responsiveImage(item.imageFile.replace(/\.webp$/, '')).src,
  imageSrcSet: responsiveImage(item.imageFile.replace(/\.webp$/, '')).srcSet,
  description: item.description,
  edition: item.edition,
  status: item.status,
  collaboration: item.collaboration,
}))
