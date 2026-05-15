import { Box } from '@mui/material'
import edmoxSign from '@/assets/edmoxSign.webp'

const LOGO_WIDTH = 873
const LOGO_HEIGHT = 433

export type EdmoxSignLogoProps = {
  alt: string
  width?: number
}

export function EdmoxSignLogo({ alt, width = 176 }: EdmoxSignLogoProps) {
  const height = (width * LOGO_HEIGHT) / LOGO_WIDTH

  return (
    <Box
      component="img"
      src={edmoxSign}
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
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
    />
  )
}
