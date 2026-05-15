import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const pngPath = path.join(rootDir, 'src', 'assets', 'edmoxSign.png')
const svgPath = path.join(rootDir, 'src', 'assets', 'logoEdmoxSign.svg')

const pngBase64 = fs.readFileSync(pngPath).toString('base64')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 873 433" role="img" aria-label="Ediciones Mox">
  <image width="873" height="433" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${pngBase64}" />
</svg>
`

fs.writeFileSync(svgPath, svg, 'utf-8')
console.log(`SVG exportado: ${svgPath}`)
