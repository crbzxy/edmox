import manifest from '@/assets/optimized/manifest.json'

const files = import.meta.glob<string>('@/assets/optimized/*.{webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function responsiveImage(name: string) {
  const entry = manifest[name as keyof typeof manifest]
  if (!entry) throw new Error(`Missing responsive image: ${name}`)
  const variants = entry.variants.map((variant) => {
    const url = files[`/src/assets/optimized/${variant.file}`]
    if (!url) throw new Error(`Missing image variant: ${variant.file}`)
    return { ...variant, url }
  })
  return {
    src: variants[variants.length - 1].url,
    srcSet: variants.map((variant) => `${variant.url} ${variant.width}w`).join(', '),
    width: entry.width,
    height: entry.height,
  }
}
