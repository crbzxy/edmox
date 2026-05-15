import { Box } from '@mui/material'
import logoEdmoxSign from '@/assets/logoEdmoxSign.svg'

export type LogoFooterProps = {
  alt: string
  width?: number
}

const LOGO_WIDTH = 873
const LOGO_HEIGHT = 433

export function LogoFooter({ alt, width = 140 }: LogoFooterProps) {
  const height = (width * LOGO_HEIGHT) / LOGO_WIDTH

  return (
    <Box
      component="img"
      src={logoEdmoxSign}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      sx={{
        display: 'block',
        flexShrink: 0,
        width,
        height: 'auto',
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
    />
  )
}
