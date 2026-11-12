// Quita metadatos (EXIF/GPS, XMP, IPTC) de las imágenes indicadas, sobrescribiéndolas.
// Uso: npm run strip:image-metadata -- src/assets/specimens/mox-019.webp [...]
// - PNG: elimina solo los bloques de texto/metadatos; los píxeles quedan idénticos.
// - JPG/WebP/AVIF: re-codifica con calidad alta sin copiar metadatos (sharp no los copia por defecto).
import fs from 'node:fs'
import sharp from 'sharp'

const files = process.argv.slice(2)
if (!files.length) {
  console.error('Uso: npm run strip:image-metadata -- <archivo> [...]')
  process.exit(1)
}

const PNG_METADATA_CHUNKS = new Set(['iTXt', 'tEXt', 'zTXt', 'eXIf', 'tIME'])

function stripPng(buffer) {
  const parts = [buffer.subarray(0, 8)]
  for (let offset = 8; offset < buffer.length;) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString('latin1', offset + 4, offset + 8)
    const end = offset + 12 + length
    if (!PNG_METADATA_CHUNKS.has(type)) parts.push(buffer.subarray(offset, end))
    offset = end
  }
  return Buffer.concat(parts)
}

for (const file of files) {
  const input = fs.readFileSync(file)
  const { format } = await sharp(input).metadata()
  let output
  if (format === 'png') output = stripPng(input)
  else if (format === 'jpeg') output = await sharp(input).rotate().jpeg({ quality: 90, mozjpeg: true }).toBuffer()
  else if (format === 'webp') output = await sharp(input).rotate().webp({ quality: 90 }).toBuffer()
  else if (format === 'heif') output = await sharp(input).rotate().avif({ quality: 70 }).toBuffer()
  else {
    console.error(`${file}: formato no soportado (${format}).`)
    process.exitCode = 1
    continue
  }
  fs.writeFileSync(file, output)
  console.log(`${file}: metadatos eliminados (${input.length} -> ${output.length} bytes).`)
}
