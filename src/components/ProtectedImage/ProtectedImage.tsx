import { Box, type BoxProps } from '@mui/material'
import type { SyntheticEvent } from 'react'

type ProtectedImageProps = {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  imageSx?: BoxProps['sx']
  wrapperSx?: BoxProps['sx']
}

function blockImageInteraction(event: SyntheticEvent) {
  event.preventDefault()
}

export function ProtectedImage({ src, alt, loading = 'lazy', imageSx, wrapperSx }: ProtectedImageProps) {
  return (
    <Box
      className="protected-image-root"
      sx={{
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        ...wrapperSx,
      }}
      onContextMenu={blockImageInteraction}
      onDragStart={blockImageInteraction}
    >
      <Box
        component="img"
        className="protected-image-media"
        src={src}
        alt={alt}
        loading={loading}
        draggable={false}
        onContextMenu={blockImageInteraction}
        onDragStart={blockImageInteraction}
        sx={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          pointerEvents: 'none',
          ...imageSx,
        }}
      />
      <Box
        aria-hidden
        className="protected-image-shield"
        onContextMenu={blockImageInteraction}
        onDragStart={blockImageInteraction}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          cursor: 'default',
        }}
      />
    </Box>
  )
}
