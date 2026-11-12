import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const output = path.join(root, 'src/assets/optimized')
await fs.mkdir(output, { recursive: true })
const rows = []
const manifest = {}
const sources = [
  'hero.webp',
  ...(await fs.readdir(path.join(root, 'src/assets/events')))
    .filter((name) => name.endsWith('.webp'))
    .sort()
    .map((name) => `events/${name}`),
  ...(await fs.readdir(path.join(root, 'src/assets/specimens')))
    .filter((name) => name.endsWith('.webp'))
    .sort()
    .map((name) => `specimens/${name}`),
]

// Originals are read only; every run generates variants from the same source.
for (const relative of sources) {
  const source = path.join(root, 'src/assets', relative)
  const originalBytes = (await fs.stat(source)).size
  const metadata = await sharp(source).metadata()
  // Los carteles de eventos llevan prefijo para no chocar con ids de piezas.
  const name = relative.startsWith('events/') ? `event-${path.parse(relative).name}` : path.parse(relative).name
  const isEvent = name.startsWith('event-')
  const widths = name === 'hero' ? [640, 960, 1600] : isEvent ? [400, 800] : [400, 800, 1400]
  const variants = []
  for (const requested of widths) {
    const width = Math.min(requested, metadata.width)
    if (variants.some((v) => v.width === width)) continue
    const pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true })
    const webp = await pipeline.clone().webp({ quality: 82, effort: 6 }).toBuffer()
    const avif = await pipeline.clone().avif({ quality: 60, effort: 5 }).toBuffer()
    // AVIF is used only when its saving over WebP is meaningful.
    const useAvif = avif.length < webp.length * 0.9
    let extension = useAvif ? 'avif' : 'webp'
    let buffer = useAvif ? avif : webp
    if (width === metadata.width && buffer.length >= originalBytes) {
      buffer = await fs.readFile(source)
      extension = 'webp'
    }
    const file = `${name}-${width}.${extension}`
    await fs.writeFile(path.join(output, file), buffer)
    variants.push({ file, width, bytes: buffer.length })
  }
  manifest[name] = { originalBytes, width: metadata.width, height: metadata.height, variants }
  rows.push({ source: relative, originalBytes, variants })
}
await fs.writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await fs.mkdir(path.join(root, 'reports'), { recursive: true })
await fs.writeFile(path.join(root, 'reports/image-optimization.json'), `${JSON.stringify(rows, null, 2)}\n`)
console.log(`Generated responsive variants for ${rows.length} images; originals preserved.`)
