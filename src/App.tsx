import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { couple, events, venue } from './data'
import { GaneshIllustration } from './components/GaneshIllustration'
import { CoupleSlider } from './components/CoupleSlider'

function getTimeUntil(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now())

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

function InvitationCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.main
      className="cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6 }}
    >
      <div className="cover-petals" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </div>
      <motion.div
        className="cover-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="cover-corner cover-corner--top" aria-hidden="true">❧</div>
        <div className="cover-corner cover-corner--bottom" aria-hidden="true">❧</div>
        <p className="bengali blessing">{couple.blessing}</p>
        <GaneshIllustration />
        <p className="eyebrow">Together with their families</p>
        <h1 className="script cover-names">
          {couple.brideName.split(' ')[0]}
          <span>&amp;</span>
          {couple.groomName.split(' ')[0]}
        </h1>
        <button className="open-button" onClick={onOpen} type="button">
          <span className="seal" aria-hidden="true">{couple.initials}</span>
          <span className="open-button-label">TAP TO OPEN</span>
          <ArrowDown className="open-button-arrow" size={18} />
        </button>
        <p className="cover-hint">A celebration of love, family &amp; forever</p>
      </motion.div>
    </motion.main>
  )
}

function Countdown() {
  const wedding = events[0]
  const [remaining, setRemaining] = useState(() => getTimeUntil(wedding.dateTime))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getTimeUntil(wedding.dateTime)), 1000)
    return () => window.clearInterval(timer)
  }, [wedding.dateTime])

  const units = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <section className="countdown-section" aria-label="Countdown to the wedding">
      <p className="eyebrow">The celebration begins in</p>
      <div className="countdown">
        {units.map(({ label, value }) => (
          <div className="countdown-unit" key={label}>
            <span>{String(value).padStart(2, '0')}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function ScratchCard({ event, index }: { event: (typeof events)[number]; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const hasRevealed = useRef(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return

    const drawCover = () => {
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = Math.round(bounds.width * pixelRatio)
      canvas.height = Math.round(bounds.height * pixelRatio)
      const context = canvas.getContext('2d')
      if (!context) return
      context.scale(pixelRatio, pixelRatio)
      const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height)
      gradient.addColorStop(0, '#711d3d')
      gradient.addColorStop(0.52, '#4c1028')
      gradient.addColorStop(1, '#2e0919')
      context.fillStyle = gradient
      context.fillRect(0, 0, bounds.width, bounds.height)
      context.strokeStyle = 'rgba(228, 201, 137, 0.75)'
      context.lineWidth = 1
      context.strokeRect(10, 10, bounds.width - 20, bounds.height - 20)
      context.textAlign = 'center'
      context.fillStyle = '#e4c989'
      context.font = '24px Georgia, serif'
      context.fillText('✦', bounds.width / 2, bounds.height / 2 - 25)
      context.font = '600 12px Georgia, serif'
      context.letterSpacing = '2px'
      context.fillText('SCRATCH TO REVEAL', bounds.width / 2, bounds.height / 2 + 5)
      context.font = '13px Georgia, serif'
      context.letterSpacing = '0'
      context.fillText(event.name, bounds.width / 2, bounds.height / 2 + 31)
      context.fillStyle = 'rgba(228, 201, 137, 0.55)'
      context.font = '11px Georgia, serif'
      context.fillText('Use your finger or mouse', bounds.width / 2, bounds.height / 2 + 54)
    }

    drawCover()
    const observer = new ResizeObserver(drawCover)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [event.name, isRevealed])

  function scratch(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return
    const bounds = canvas.getBoundingClientRect()
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    context.globalCompositeOperation = 'destination-out'
    context.lineWidth = 48
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + 0.1, y + 0.1)
    context.stroke()

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    let sampled = 0
    for (let pixel = 3; pixel < pixels.length; pixel += 48) {
      sampled++
      if (pixels[pixel] === 0) cleared++
    }
    if (!hasRevealed.current && cleared / sampled >= 0.24) {
      hasRevealed.current = true
      setIsRevealed(true)
    }
  }

  function finishScratch() {
    isDrawing.current = false
  }

  return (
    <motion.article
      className="event-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="event-card-content">
        <span className="event-number">0{index + 1}</span>
        <p className="bengali event-bengali">{event.bengaliName}</p>
        <h3>{event.name}</h3>
        <div className="event-date">
          <span className="event-day">{event.day}</span>
          <span className="event-month">{event.month}<small>2026</small></span>
        </div>
        <p className="event-weekday">{event.weekday}</p>
        <div className="fine-rule"><span>✦</span></div>
        <p className="event-note">{event.note}</p>
        <p className="time-note">Ceremony time to be announced</p>
      </div>
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            className="scratch-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45 }}
            aria-label={`Scratch to reveal ${event.name} details`}
            role="button"
            tabIndex={0}
            onKeyDown={(keyboardEvent) => {
              if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                keyboardEvent.preventDefault()
                hasRevealed.current = true
                setIsRevealed(true)
              }
            }}
            onPointerDown={(pointerEvent) => {
              pointerEvent.preventDefault()
              isDrawing.current = true
              pointerEvent.currentTarget.setPointerCapture(pointerEvent.pointerId)
              scratch(pointerEvent)
            }}
            onPointerMove={(pointerEvent) => {
              if (isDrawing.current) scratch(pointerEvent)
            }}
            onPointerUp={finishScratch}
            onPointerCancel={finishScratch}
          />
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function Invitation() {
  return (
    <motion.div
      className="invitation"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="petal petal-one" aria-hidden="true">✿</div>
      <div className="petal petal-two" aria-hidden="true">✿</div>
      <header className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <p className="bengali blessing">{couple.blessing}</p>
        <div className="mandala" aria-hidden="true"><span>❋</span></div>
        <p className="eyebrow">With the blessings of our families</p>
        <h1 className="script names">
          <span>{couple.brideName.split(' ')[0]}</span>
          <i>&amp;</i>
          <span>{couple.groomName.split(' ')[0]}</span>
        </h1>
        <p className="full-names">{couple.brideName} <span>and</span> {couple.groomName}</p>
        <p className="bengali couple-bengali">{couple.brideBangla} <span>ও</span> {couple.groomBangla}</p>
        <div className="hero-rule"><span>❦</span></div>
        <p className="invitation-line">Request the pleasure of your company<br />as they begin their life together</p>
        <p className="quote">{couple.quote}</p>
        <a className="scroll-cue" href="#celebrations" aria-label="Scroll to celebration details">
          <ArrowDown size={17} />
        </a>
      </header>

      <CoupleSlider />

      <Countdown />

      <section className="events-section" id="celebrations">
        <div className="section-heading">
          <p className="eyebrow">Save the dates</p>
          <h2 className="script">Two days, one beginning</h2>
          <p className="bengali section-bengali">আনন্দে আপনাদের আমন্ত্রণ</p>
        </div>
        <div className="event-grid">
          {events.map((event, index) => <ScratchCard event={event} index={index} key={event.id} />)}
        </div>
      </section>

      <section className="venue-section">
        <div className="venue-card">
          <div className="venue-icon"><MapPin size={20} /></div>
          <p className="eyebrow">Where we’ll celebrate</p>
          <h2 className="script">Ahaban Banquet</h2>
          <p className="venue-address">{venue.address}</p>
          <p className="venue-note">Our groom’s home town <span>·</span> {venue.groomLocation}</p>
          <a className="map-button" href={venue.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={16} /> View directions
          </a>
          <div className="venue-flourish" aria-hidden="true">✦ &nbsp; ❦ &nbsp; ✦</div>
        </div>
      </section>

      <section className="closing">
        <Sparkles className="closing-sparkle" size={20} />
        <p className="eyebrow">Your presence is our present</p>
        <h2 className="script">With love &amp; gratitude</h2>
        <p>We can’t wait to celebrate with you.</p>
        <div className="closing-names">{couple.brideName} <span>&amp;</span> {couple.groomName}</div>
      </section>

      <footer className="footer">
        <CalendarDays size={14} />
        <span>09 December · 11 December 2026</span>
      </footer>
    </motion.div>
  )
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {isOpen
          ? <Invitation key="invitation" />
          : <InvitationCover key="cover" onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>
    </div>
  )
}
