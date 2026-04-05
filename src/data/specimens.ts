import specimen01 from '@/assets/specimen-01.jpg'
import specimen02 from '@/assets/specimen-02.jpg'
import specimen03 from '@/assets/specimen-03.jpg'
import specimen04 from '@/assets/specimen-04.jpg'
import specimen05 from '@/assets/specimen-05.jpg'
import specimen06 from '@/assets/specimen-06.jpg'

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

export const specimens: Specimen[] = [
  {
    id: 'mox-001',
    name: 'Biollante GID',
    artist: 'CCP',
    year: 2024,
    material: 'GID Vinyl',
    height: '28cm',
    origin: 'Tokyo, Japan',
    image: specimen01,
    description:
      'Translucent glow-in-the-dark soft vinyl casting of the legendary Biollante kaiju. Each piece hand-finished with phosphorescent pigments that reveal intricate sculpt details in darkness.',
    edition: '1/50',
    status: 'pre-order',
  },
  {
    id: 'mox-002',
    name: 'Mecha Sentinel',
    artist: 'Awesome Toy',
    year: 2024,
    material: 'Painted Vinyl',
    height: '22cm',
    origin: 'Hong Kong',
    image: specimen02,
    description:
      'Metallic purple and silver painted soft vinyl robot figure. Hand-sprayed with automotive-grade metallic paint over a dark base coat. Articulated at 5 points.',
    edition: '1/30',
    status: 'available',
  },
  {
    id: 'mox-003',
    name: 'Dokuro Walker',
    artist: 'Realxhead',
    year: 2023,
    material: 'GID Vinyl',
    height: '18cm',
    origin: 'Tokyo, Japan',
    image: specimen03,
    description:
      'Oversized skull creature cast in milky translucent vinyl with UV-reactive phosphorescent compound. The eyes and cranium emit an ethereal green glow under blacklight.',
    edition: '1/100',
    status: 'sold',
  },
  {
    id: 'mox-004',
    name: 'Ryū Crimson',
    artist: 'Medicom',
    year: 2024,
    material: 'Clear Red Vinyl',
    height: '25cm',
    origin: 'Tokyo, Japan',
    image: specimen04,
    description:
      'Clear red translucent dragon kaiju with hand-applied gold leaf accents on dorsal spines and claws. The vinyl catches and refracts light creating a deep ruby luminescence.',
    edition: '1/25',
    status: 'available',
  },
  {
    id: 'mox-005',
    name: 'Xeno Spawn',
    artist: 'Kiyokawa',
    year: 2023,
    material: 'Painted Vinyl',
    height: '20cm',
    origin: 'Osaka, Japan',
    image: specimen05,
    description:
      'Electric blue and obsidian painted alien creature with exoskeletal detail. Multi-layer spray technique creates depth and biological realism on the vinyl surface.',
    edition: '1/40',
    status: 'pre-order',
  },
  {
    id: 'mox-006',
    name: 'Kirin Blaze',
    artist: 'Kodama Toy',
    year: 2024,
    material: 'Clear Orange Vinyl',
    height: '24cm',
    origin: 'Tokyo, Japan',
    image: specimen06,
    description:
      'Clear orange translucent mythical beast with internal LED-reactive vinyl compound. When backlit, the figure appears to contain living flame within its crystalline body.',
    edition: '1/35',
    status: 'available',
  },
]
