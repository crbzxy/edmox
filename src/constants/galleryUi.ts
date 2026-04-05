export const STATUS_DOT_SIZE_PX = 8
/** Altura máxima de la foto en la ficha de detalle (viewport del cliente). */
export const SPECIMEN_DETAIL_IMAGE_MAX_HEIGHT = '70vh' as const
/**
 * Altura del recuadro de imagen en la grilla del archivo.
 * Sin tope, el ratio 3/4 en columnas anchas llena casi toda la pantalla por tarjeta.
 */
export const ARCHIVE_CARD_IMAGE_FRAME_HEIGHT = 'min(36vh, 320px)' as const
export const CARD_IMAGE_ASPECT_RATIO = '3 / 4' as const
export const STAGGER_DELAY_MS_CAP = 8
export const STAGGER_DELAY_STEP_MS = 40
