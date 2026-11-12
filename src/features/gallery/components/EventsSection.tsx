import { Box, Link, Typography } from '@mui/material'
import { galleryEvents } from '@/data/events'
import { SECTION_EVENTS_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { brandPalette as colors } from '@/theme/appColorTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

export function EventsSection() {
  return (
    <Box
      component="section"
      id={SECTION_EVENTS_ID}
      aria-labelledby="events-title"
      sx={{ bgcolor: colors.paper, color: colors.ink, py: { xs: 7, md: 10 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}
    >
      <GalleryContentBounds>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 3, mb: 5 }}
        >
          <Box>
            <Typography variant="overline" sx={{ display: 'block', color: colors.red, mb: 2 }}>
              Eventos / Archivo de participaciones
            </Typography>
            <Typography id="events-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 0.98 }}>
              Fuera del taller<span aria-hidden="true"> ↗</span>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ maxWidth: 320, color: colors.inkSoft }}>
            Bazares y encuentros donde las figuras comparten espacio con otras formas de hacer arte.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 3,
          }}
        >
          {galleryEvents.map((event) => (
            <Box
              component="article"
              key={event.id}
              sx={{
                border: `1px solid ${colors.ink}`,
                bgcolor: colors.paperRaised,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: colors.paper, borderBottom: `1px solid ${colors.ink}` }}>
                <Box
                  component="img"
                  src={event.poster}
                  alt={`Cartel de ${event.name}, ${event.dateLabel}`}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={event.id === 'geometra-2026' ? 1000 : 1067}
                  sx={{ display: 'block', width: '100%', height: { xs: 360, sm: 440 }, objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="overline" sx={{ color: colors.red, mb: 2 }}>
                  <Box component="time" dateTime={event.startDate}>
                    {event.dateLabel}
                  </Box>
                </Typography>
                <Typography variant="h3" sx={{ fontSize: '2rem', mb: 2 }}>
                  {event.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {event.venue}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.inkSoft, mt: 0.5 }}>
                  {event.location}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
                  {event.description}
                </Typography>
                <Link
                  href={event.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: colors.ink,
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    '&:hover': { color: colors.red },
                  }}
                >
                  Ver publicación original ↗
                </Link>
              </Box>
            </Box>
          ))}
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
