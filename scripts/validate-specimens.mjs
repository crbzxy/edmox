// Valida el catálogo (src/data/specimens.json) y que el manifiesto de imágenes responsivas esté al día.
// Corre dentro de `npm run build` y `npm run check`: un dato roto falla el build, no la web en producción.
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(import.meta.dirname, '..')
const specimensJsonPath = path.join(rootDir, 'src', 'data', 'specimens.json')
const assetsDir = path.join(rootDir, 'src', 'assets')
const manifestPath = path.join(assetsDir, 'optimized', 'manifest.json')

const allowedStatuses = new Set(['available', 'sold', 'pre-order'])
const idPattern = /^mox-\d{3}$/
const currentYear = new Date().getFullYear()

/** Campos permitidos: tipo y si son obligatorios. Un campo desconocido es error (atrapa typos como "staus"). */
const schema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  artist: { type: 'string', required: true },
  year: { type: 'number', required: true },
  material: { type: 'string', required: true },
  imageFile: { type: 'string', required: true },
  description: { type: 'string', required: true },
  height: { type: 'string' },
  origin: { type: 'string' },
  sourceUrl: { type: 'string' },
  edition: { type: 'string' },
  status: { type: 'string' },
  collaboration: { type: 'boolean' },
}

const errors = []
const fail = (message) => errors.push(message)

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    fail(`No se pudo leer ${path.relative(rootDir, filePath)}: ${error.message}`)
    return undefined
  }
}

function validateSpecimen(specimen, index, seenIds, manifest) {
  const label = typeof specimen?.id === 'string' ? specimen.id : `entrada #${index + 1}`
  if (!specimen || typeof specimen !== 'object' || Array.isArray(specimen)) {
    fail(`${label}: debe ser un objeto.`)
    return
  }

  for (const [field, rule] of Object.entries(schema)) {
    const value = specimen[field]
    if (value === undefined) {
      if (rule.required) fail(`${label}: falta el campo obligatorio "${field}".`)
      continue
    }
    if (typeof value !== rule.type) fail(`${label}: "${field}" debe ser ${rule.type}, es ${typeof value}.`)
    else if (rule.type === 'string' && !value.trim()) fail(`${label}: "${field}" está vacío.`)
  }
  for (const field of Object.keys(specimen)) {
    if (!(field in schema)) fail(`${label}: campo desconocido "${field}".`)
  }

  if (typeof specimen.id === 'string') {
    if (!idPattern.test(specimen.id)) fail(`${label}: id con formato inválido (esperado mox-001).`)
    if (seenIds.has(specimen.id)) fail(`${label}: id duplicado.`)
    seenIds.add(specimen.id)
  }
  if (specimen.status !== undefined && !allowedStatuses.has(specimen.status)) {
    fail(`${label}: status inválido "${specimen.status}" (usa ${[...allowedStatuses].join(', ')}).`)
  }
  if (typeof specimen.year === 'number' && (specimen.year < 2000 || specimen.year > currentYear + 1)) {
    fail(`${label}: año fuera de rango (${specimen.year}).`)
  }
  if (typeof specimen.sourceUrl === 'string' && !/^https:\/\//.test(specimen.sourceUrl)) {
    fail(`${label}: sourceUrl debe empezar con https://.`)
  }

  if (typeof specimen.imageFile === 'string') {
    if (!fs.existsSync(path.join(assetsDir, 'specimens', specimen.imageFile))) {
      fail(`${label}: imagen no encontrada en src/assets/specimens/${specimen.imageFile}.`)
    }
    const imageName = specimen.imageFile.replace(/\.webp$/, '')
    if (manifest && !manifest[imageName]) {
      fail(`${label}: "${imageName}" no está en el manifiesto de imágenes. Corre \`npm run optimize:images\`.`)
    }
  }
}

/** Toda imagen fuente debe tener sus variantes generadas; si no, `responsiveImage()` falla en el navegador. */
function validateManifestCoverage(manifest) {
  const sources = [
    ['events', (name) => `event-${name}`],
    ['specimens', (name) => name],
  ]
  for (const [folder, toKey] of sources) {
    const dir = path.join(assetsDir, folder)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.webp'))) {
      const key = toKey(file.replace(/\.webp$/, ''))
      if (!manifest[key])
        fail(`src/assets/${folder}/${file} sin variantes ("${key}"). Corre \`npm run optimize:images\`.`)
    }
  }
  for (const [key, entry] of Object.entries(manifest)) {
    for (const variant of entry.variants ?? []) {
      if (!fs.existsSync(path.join(assetsDir, 'optimized', variant.file))) {
        fail(`Manifiesto "${key}": falta el archivo optimized/${variant.file}.`)
      }
    }
  }
}

const specimens = readJson(specimensJsonPath)
const manifest = readJson(manifestPath)

if (specimens !== undefined && !Array.isArray(specimens)) fail('specimens.json debe ser un array.')
if (Array.isArray(specimens)) {
  const seenIds = new Set()
  specimens.forEach((specimen, index) => validateSpecimen(specimen, index, seenIds, manifest))
}
if (manifest) validateManifestCoverage(manifest)

if (errors.length > 0) {
  console.error(`Validación del catálogo falló (${errors.length} error(es)):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`OK. Catálogo válido: ${specimens.length} pieza(s); manifiesto de imágenes al día.`)
}
