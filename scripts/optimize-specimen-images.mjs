import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const specimensDir = path.join(rootDir, 'src', 'assets', 'specimens')
const assetsDir = path.join(rootDir, 'src', 'assets')

const WEBP_QUALITY = 82
const SPECIMEN_MAX_WIDTH_PX = 1400
const HERO_MAX_WIDTH_PX = 1920

const HERO_SOURCE_FILES = ['hero', 'hero-bg', 'hero-photo']

async function convertToWebp({ sourcePath, targetPath, maxWidth }) {
  await sharp(sourcePath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(targetPath)

  const sourceStats = fs.statSync(sourcePath)
  const targetStats = fs.statSync(targetPath)
  const savedPercent = Math.round((1 - targetStats.size / sourceStats.size) * 100)

  return { savedPercent, targetSize: targetStats.size }
}

function listRasterSources(directory) {
  if (!fs.existsSync(directory)) return []

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
    .map((entry) => entry.name)
}

async function optimizeSpecimenImages() {
  const sources = listRasterSources(specimensDir)
  const existingWebp = fs.existsSync(specimensDir)
    ? fs.readdirSync(specimensDir).filter((name) => name.endsWith('.webp'))
    : []

  if (sources.length === 0) {
    if (existingWebp.length > 0) {
      console.log(
        `Specimens: ya están en WebP (${existingWebp.length} archivo(s): ${existingWebp.join(', ')}).`,
      )
      console.log('  Para optimizar una pieza nueva, agrega p. ej. mox-005.png en src/assets/specimens/ y vuelve a ejecutar.')
    } else {
      console.log('Specimens: no hay PNG/JPG ni WebP en src/assets/specimens/.')
    }
    return 0
  }

  console.log(`Specimens: convirtiendo ${sources.length} archivo(s)...`)

  for (const fileName of sources) {
    const sourcePath = path.join(specimensDir, fileName)
    const baseName = path.parse(fileName).name
    const targetPath = path.join(specimensDir, `${baseName}.webp`)

    const { savedPercent } = await convertToWebp({
      sourcePath,
      targetPath,
      maxWidth: SPECIMEN_MAX_WIDTH_PX,
    })

    console.log(`  ${fileName} → ${baseName}.webp (${savedPercent}% más liviano)`)
    fs.unlinkSync(sourcePath)
  }

  return sources.length
}

async function optimizeHeroImages() {
  let converted = 0

  for (const baseName of HERO_SOURCE_FILES) {
    const sourcePath = ['.jpg', '.jpeg', '.png']
      .map((ext) => path.join(assetsDir, `${baseName}${ext}`))
      .find((candidate) => fs.existsSync(candidate))

    if (!sourcePath) {
      const webpPath = path.join(assetsDir, `${baseName}.webp`)
      if (fs.existsSync(webpPath)) {
        console.log(`Hero: ${baseName}.webp ya existe.`)
      }
      continue
    }

    const targetPath = path.join(assetsDir, `${baseName}.webp`)
    const { savedPercent } = await convertToWebp({
      sourcePath,
      targetPath,
      maxWidth: HERO_MAX_WIDTH_PX,
    })

    console.log(`  ${path.basename(sourcePath)} → ${baseName}.webp (${savedPercent}% más liviano)`)
    fs.unlinkSync(sourcePath)
    converted += 1
  }

  if (converted === 0 && HERO_SOURCE_FILES.every((name) => fs.existsSync(path.join(assetsDir, `${name}.webp`)))) {
    console.log('Hero: ya están en WebP (hero-bg.webp, hero-photo.webp).')
  }

  return converted
}

async function run() {
  const specimenCount = await optimizeSpecimenImages()
  console.log('')
  const heroCount = await optimizeHeroImages()

  if (specimenCount + heroCount > 0) {
    console.log('\nOptimización WebP completada.')
    if (specimenCount > 0) {
      console.log('Recuerda actualizar imageFile en specimens.json si agregaste piezas nuevas (mox-XXX.webp).')
    }
    if (heroCount > 0) {
      console.log('Hero: actualiza los imports en HeroSection.tsx a .webp si aún usan .jpg.')
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
