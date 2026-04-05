import { Box } from '@mui/material'
import logoEdmox from '@/assets/logoEdmox.png'

export type LogoProps = {
  alt: string
  size?: 'nav' | 'sm' | 'md' | 'lg'
}

const logoWidthBySize: Record<NonNullable<LogoProps['size']>, number> = {
  nav: 108,
  sm: 120,
  md: 176,
  lg: 240,
}

export function Logo({ alt, size = 'md' }: LogoProps) {
  return (
    <Box
      component="img"
      src={logoEdmox}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
      sx={{
        display: 'block',
        height: 'auto',
        width: logoWidthBySize[size],
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
    />
  )
}
