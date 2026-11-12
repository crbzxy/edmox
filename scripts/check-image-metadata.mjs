// Bloquea imágenes con metadatos EXIF/XMP en el repo (público): las fotos de celular pueden traer
// coordenadas GPS del taller, modelo de cámara, autor o software. Corre en `npm run check` y en CI.
// Para limpiar una imagen: `npm run strip:image-metadata -- <archivo>`.
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = path.resolve(import.meta.dirname, '..')
const files = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '--', 'src/assets', 'public'], {
  cwd: rootDir,
  encoding: 'utf-8',
})
  .split('\n')
  .filter((file) => /\.(jpe?g|png|webp|avif|tiff?|heic)$/i.test(file))

const problems = []
for (const file of files) {
  try {
    const meta = await sharp(path.join(rootDir, file)).metadata()
    const found = []
    if (meta.exif) found.push('EXIF (puede incluir GPS y cámara)')
    if (meta.xmp) found.push('XMP')
    if (meta.iptc) found.push('IPTC')
    if (found.length) problems.push(`${file}: ${found.join(', ')}`)
  } catch (error) {
    problems.push(`${file}: no se pudo leer (${error.message})`)
  }
}

if (problems.length) {
  console.error('Imágenes con metadatos (pueden exponer ubicación, cámara o autor):')
  for (const problem of problems) console.error(`- ${problem}`)
  console.error('Límpialas con: npm run strip:image-metadata -- <archivo> [...]')
  process.exitCode = 1
} else {
  console.log(`OK. ${files.length} imágenes sin metadatos EXIF/XMP/IPTC.`)
}
