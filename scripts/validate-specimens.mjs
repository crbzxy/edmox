import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const specimensJsonPath = path.join(rootDir, 'src', 'data', 'specimens.json')
const assetsDir = path.join(rootDir, 'src', 'assets', 'specimens')

const allowedStatuses = new Set(['available', 'sold', 'pre-order'])
const idPattern = /^mox-(\d{3})$/

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

function readSpecimens() {
  const raw = fs.readFileSync(specimensJsonPath, 'utf-8')
  return JSON.parse(raw)
}

function validate() {
  const specimens = readSpecimens()
  const errors = []
  const seenIds = new Set()

  if (!Array.isArray(specimens)) {
    errors.push('specimens.json debe ser un array.')
  }

  for (const specimen of specimens) {
    if (!specimen || typeof specimen !== 'object') {
      errors.push('Entrada inválida en specimens.json.')
      continue
    }

    if (typeof specimen.id !== 'string') errors.push('Falta "id" en una entrada.')

    if (seenIds.has(specimen.id)) errors.push(`ID duplicado: ${specimen.id}`)
    seenIds.add(specimen.id)

    const match = typeof specimen.id === 'string' ? specimen.id.match(idPattern) : null
    if (!match) errors.push(`ID con formato inválido (esperado mox-001): ${specimen.id}`)

    if (!allowedStatuses.has(specimen.status)) errors.push(`Status inválido para ${specimen.id}: ${specimen.status}`)

    if (typeof specimen.imageFile !== 'string') {
      errors.push(`Falta "imageFile" para ${specimen.id}`)
      continue
    }

    const imagePath = path.join(assetsDir, specimen.imageFile)
    if (!fileExists(imagePath)) errors.push(`Imagen no encontrada para ${specimen.id}: ${specimen.imageFile}`)
  }

  if (errors.length > 0) {
    console.error('Validación de specimens falló con los siguientes errores:')
    for (const err of errors) {
      console.error(`- ${err}`)
    }
    process.exitCode = 1
    return
  }

  const count = specimens.length
  console.log(`OK. Catálogo válido: ${count} pieza(s).`)
}

validate()

