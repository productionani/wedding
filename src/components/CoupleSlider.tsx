import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const couplePhotos = [
  {
    src: '/109A2285%20(1).JPG',
    alt: 'Sumana and Amardyuti together in traditional attire',
    title: 'Our Traditional Beginning',
    caption: 'Wrapped in love, heritage and endless smiles',
  },
  {
    src: '/109A2783.JPG',
    alt: 'Sumana and Amardyuti sharing a joyful moment',
    title: 'Pure Joy & Serenity',
    caption: 'Every moment feels like home with you',
  },
  {
    src: '/WhatsApp%20Image%202026-11-09%20at%2011.31.28%20PM%20(1).jpeg',
    alt: 'Sumana and Amardyuti by the river',
    title: 'By The Sacred River',
    caption: 'Under the open sky and timeless waters',
  },
  {
    src: '/WhatsApp%20Image%202026-11-09%20at%2011.31.29%20PM%20(1).jpeg',
    alt: 'Sumana and Amardyuti enjoying a stroll together',
    title: 'Hand In Hand Forever',
    caption: 'Stepping into a lifetime of shared dreams',
  },
]

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 280 : -280,
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
}

export function CoupleSlider() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const photoIndex = ((page % couplePhotos.length) + couplePhotos.length) % couplePhotos.length
  const currentPhoto = couplePhotos[photoIndex]

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection])
  }

  const goToSlide = (targetIndex: number) => {
    const diff = targetIndex - photoIndex
    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1])
    }
  }

  // Automatic slide advancement with pause on interaction
  useEffect(() => {
    if (isPaused) return
    const interval = window.setInterval(() => {
      paginate(1)
    }, 4500)
    return () => window.clearInterval(interval)
  }, [page, isPaused])

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  return (
    <section className="gallery-section" aria-label="Photos of the couple">
      <div className="section-heading">
        <p className="eyebrow">Together, in every season</p>
        <h2 className="script">A little glimpse of our story</h2>
      </div>

      <div
        className="slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Slide Counter Badge */}
        <div className="slider-badge" aria-live="polite">
          <span className="slider-badge-current">{String(photoIndex + 1).padStart(2, '0')}</span>
          <span className="slider-badge-divider">/</span>
          <span className="slider-badge-total">{String(couplePhotos.length).padStart(2, '0')}</span>
        </div>

        {/* Main Stage */}
        <div className="slider-stage">
          {/* Decorative Corner Filigrees */}
          <div className="slider-corner slider-corner--tl" aria-hidden="true">❧</div>
          <div className="slider-corner slider-corner--br" aria-hidden="true">❧</div>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="slider-card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold || offset.x < -60) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold || offset.x > 60) {
                  paginate(-1)
                }
              }}
            >
              <div className="slider-image-frame">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="slider-image"
                  draggable={false}
                />
              </div>

              {/* Romantic Story Caption */}
              <div className="slider-caption-card">
                <h3 className="slider-photo-title">{currentPhoto.title}</h3>
                <p className="slider-photo-text">{currentPhoto.caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            className="slider-nav-btn slider-nav-btn--prev"
            onClick={() => paginate(-1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="slider-nav-btn slider-nav-btn--next"
            onClick={() => paginate(1)}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Thumbnail Dots Navigation */}
        <div className="slider-dots" role="tablist" aria-label="Photo slides">
          {couplePhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-selected={index === photoIndex}
              aria-label={`Go to slide ${index + 1}: ${photo.title}`}
              className={`slider-dot ${index === photoIndex ? 'slider-dot--active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <span className="slider-dot-inner" />
            </button>
          ))}
        </div>

        {/* Swipe Hint for Mobile */}
        <p className="slider-swipe-hint">Swipe or tap arrows to see more moments</p>
      </div>
    </section>
  )
}
