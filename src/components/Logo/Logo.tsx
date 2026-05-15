import { Box } from '@mui/material'
import logoEdmoxFooter from '@/assets/logoEdmoxFooter.webp'
import { LOGO_CORNER_RADIUS_PX } from '@/theme/appColorTokens'

export type LogoProps = {
  alt: string
  size?: 'nav' | 'sm' | 'md' | 'lg'
}

const LOGO_WIDTH = 346
const LOGO_HEIGHT = 184

const logoWidthBySize: Record<NonNullable<LogoProps['size']>, number> = {
  nav: 108,
  sm: 120,
  md: 176,
  lg: 240,
}

export function Logo({ alt, size = 'md' }: LogoProps) {
  const width = logoWidthBySize[size]
  const height = (width * LOGO_HEIGHT) / LOGO_WIDTH

  return (
    <Box
      component="img"
      src={logoEdmoxFooter}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      draggable={false}
      sx={{
        display: 'block',
        flexShrink: 0,
        width,
        height: 'auto',
        borderRadius: `${LOGO_CORNER_RADIUS_PX}px`,
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
    />
  )
}
