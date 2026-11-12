import { Box, Link, Typography } from '@mui/material'
import { galleryCopy } from '@/content/galleryCopy'
import { galleryEvents } from '@/data/events'
import { SECTION_EVENTS_ID, SECTION_SCROLL_MARGIN } from '@/constants/gallery'
import { ui } from '@/theme/uiTokens'
import { GalleryContentBounds } from './GalleryContentBounds'

export function EventsSection() {
  const { events } = galleryCopy

  return (
    <Box
      component="section"
      id={SECTION_EVENTS_ID}
      aria-labelledby="events-title"
      sx={{ bgcolor: ui.surface, color: ui.ink, py: { xs: 7, md: 10 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}
    >
      <GalleryContentBounds>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 3, mb: 5 }}
        >
          <Box>
            <Typography variant="overline" sx={{ display: 'block', color: ui.accentText, mb: 2 }}>
              {events.eyebrow}
            </Typography>
            <Typography id="events-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 0.98 }}>
              {events.title}
              <span aria-hidden="true"> ↗</span>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ maxWidth: 320, color: ui.inkSoft }}>
            {events.intro}
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
                border: `1px solid ${ui.ink}`,
                bgcolor: ui.surfaceRaised,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: ui.surface, borderBottom: `1px solid ${ui.ink}` }}>
                <Box
                  component="img"
                  src={event.poster.src}
                  srcSet={event.poster.srcSet}
                  sizes="(min-width: 600px) 340px, 280px"
                  alt={events.posterAlt(event.name, event.dateLabel)}
                  loading="lazy"
                  decoding="async"
                  width={event.poster.width}
                  height={event.poster.height}
                  sx={{ display: 'block', width: '100%', height: { xs: 360, sm: 440 }, objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="overline" sx={{ color: ui.accentText, mb: 2 }}>
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
                <Typography variant="body2" sx={{ color: ui.inkSoft, mt: 0.5 }}>
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
                    color: ui.ink,
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    '&:hover': { color: ui.accentText },
                  }}
                >
                  {events.sourceCta} ↗
                </Link>
              </Box>
            </Box>
          ))}
        </Box>
      </GalleryContentBounds>
    </Box>
  )
}
