import specimensJson from '@/data/specimens.json'

export type Specimen = {
  id: string
  name: string
  artist: string
  year: number
  material: string
  height: string
  origin: string
  image: string
  description: string
  edition: string
  status: 'available' | 'sold' | 'pre-order'
}

type SpecimenJson = Omit<Specimen, 'image'> & { imageFile: string }

type GlobbedImage = string | { default: string }

const specimenImageModules = import.meta.glob('@/assets/specimens/*.webp', {
  eager: true,
  query: '?url',
}) as Record<string, GlobbedImage>

function resolveSpecimenImageUrl(imageFile: string): string {
  const key = Object.keys(specimenImageModules).find((path) => path.endsWith(`/specimens/${imageFile}`))
  if (!key) throw new Error(`Imagen no encontrada en assets/specimens: ${imageFile}`)

  const moduleValue = specimenImageModules[key]
  if (typeof moduleValue === 'string') return moduleValue
  return moduleValue.default
}

export const specimens: Specimen[] = (specimensJson as SpecimenJson[]).map((item) => ({
  id: item.id,
  name: item.name,
  artist: item.artist,
  year: item.year,
  material: item.material,
  height: item.height,
  origin: item.origin,
  image: resolveSpecimenImageUrl(item.imageFile),
  description: item.description,
  edition: item.edition,
  status: item.status,
}))
