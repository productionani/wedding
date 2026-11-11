import { motion } from 'framer-motion'

export function GaneshIllustration() {
  return (
    <motion.div
      className="ganesh-wrapper"
      role="img"
      aria-label="Auspicious Lord Ganesha with divine glowing halo"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Divine Backlight & Radiance Halos */}
      <div className="ganesh-glow-backdrop" aria-hidden="true" />
      <div className="ganesh-aura-pulse" aria-hidden="true" />

      {/* Floating divine blessing sparkles */}
      <div className="ganesh-sparkles-layer" aria-hidden="true">
        <span className="g-sparkle g-s1">✦</span>
        <span className="g-sparkle g-s2">✧</span>
        <span className="g-sparkle g-s3">✦</span>
        <span className="g-sparkle g-s4">✧</span>
      </div>

      <motion.div
        className="ganesh-svg-container"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 240 240"
          className="ganesh-svg"
          aria-hidden="true"
        >
          <defs>
            {/* 24k Royal Polished Gold Linear Gradient */}
            <linearGradient id="ganeshGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E0" />
              <stop offset="28%" stopColor="#F9D776" />
              <stop offset="65%" stopColor="#E6A734" />
              <stop offset="100%" stopColor="#B37517" />
            </linearGradient>

            {/* Deep Rich Gold Gradient */}
            <linearGradient id="ganeshGoldDeep" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEAA7" />
              <stop offset="40%" stopColor="#E5A635" />
              <stop offset="85%" stopColor="#AC6909" />
              <stop offset="100%" stopColor="#784403" />
            </linearGradient>

            {/* Radial Gold Flare for Aura */}
            <radialGradient id="ganeshAuraRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 235, 160, 0.45)" />
              <stop offset="45%" stopColor="rgba(235, 165, 40, 0.22)" />
              <stop offset="78%" stopColor="rgba(180, 70, 40, 0.08)" />
              <stop offset="100%" stopColor="rgba(120, 20, 40, 0)" />
            </radialGradient>

            {/* Sacred Vermilion Sindoor / Kumkum Red Gradient */}
            <radialGradient id="ganeshSindoor" cx="45%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#FF5773" />
              <stop offset="35%" stopColor="#E61C3D" />
              <stop offset="85%" stopColor="#A8071A" />
              <stop offset="100%" stopColor="#5E000B" />
            </radialGradient>

            {/* Saffron & Amber Glow for Modak */}
            <radialGradient id="ganeshModakGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="35%" stopColor="#FFC837" />
              <stop offset="75%" stopColor="#FF8008" />
              <stop offset="100%" stopColor="#C95100" />
            </radialGradient>

            {/* Ivory Pearl Gradient for Tusks */}
            <linearGradient id="ganeshIvory" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF4D0" />
              <stop offset="100%" stopColor="#E0C688" />
            </linearGradient>

            {/* Metallic Gold Stroke Gradient */}
            <linearGradient id="ganeshStrokeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5CC" />
              <stop offset="50%" stopColor="#E8B74E" />
              <stop offset="100%" stopColor="#9C6410" />
            </linearGradient>

            {/* Subtle Drop Shadow Filter */}
            <filter id="ganeshShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#26040F" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* 1. Divine Aura Background Disk */}
          <circle cx="120" cy="120" r="102" fill="url(#ganeshAuraRadial)" />

          {/* 2. Rotating Prabhavali (Radiant Celestial Sunbeams / Halo) */}
          <g className="ganesh-halo-spin">
            {/* 16 Radiating Rays */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = i * 22.5
              return (
                <path
                  key={`ray-${i}`}
                  d="M120 22 L123 32 L117 32 Z"
                  fill="url(#ganeshGoldLight)"
                  opacity="0.85"
                  transform={`rotate(${angle} 120 120)`}
                />
              )
            })}
            {/* Outer Sacred Sunbeam Ring */}
            <circle
              cx="120"
              cy="120"
              r="94"
              fill="none"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.75"
            />
          </g>

          {/* 3. Static Ornate Beaded Halo Rings */}
          <circle
            cx="120"
            cy="120"
            r="87"
            fill="none"
            stroke="url(#ganeshStrokeGold)"
            strokeWidth="1.8"
            opacity="0.9"
          />
          <circle
            cx="120"
            cy="120"
            r="81"
            fill="none"
            stroke="url(#ganeshStrokeGold)"
            strokeWidth="0.9"
            strokeDasharray="2 3"
            opacity="0.65"
          />

          {/* Decorative Lotus Petals at Halo Base */}
          <g className="ganesh-lotus-base" filter="url(#ganeshShadow)">
            <path
              d="M78 206 C92 195 106 198 120 205 C134 198 148 195 162 206 C150 216 135 220 120 219 C105 220 90 216 78 206 Z"
              fill="url(#ganeshGoldDeep)"
              stroke="url(#ganeshGoldLight)"
              strokeWidth="1.2"
            />
            {/* Center Lotus Petal */}
            <path
              d="M120 196 C112 204 114 213 120 218 C126 213 128 204 120 196 Z"
              fill="url(#ganeshSindoor)"
              opacity="0.9"
            />
          </g>

          {/* 4. Body, Torso & Shoulders with Auspicious Royal Adornment */}
          <g filter="url(#ganeshShadow)">
            {/* Left and Right Shoulders / Angavastra */}
            <path
              d="M66 182 C72 166 84 158 100 156 C105 164 112 170 120 171 C128 170 135 164 140 156 C156 158 168 166 174 182 C162 194 142 198 120 198 C98 198 78 194 66 182 Z"
              fill="url(#ganeshGoldDeep)"
              stroke="url(#ganeshGoldLight)"
              strokeWidth="1.4"
            />

            {/* Sacred Royal Haar / Necklace */}
            <path
              d="M94 163 C102 176 110 182 120 182 C130 182 138 176 146 163"
              fill="none"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M99 168 C106 179 112 185 120 185 C128 185 134 179 141 168"
              fill="none"
              stroke="url(#ganeshGoldLight)"
              strokeWidth="1.2"
              strokeDasharray="2 3"
            />
            {/* Central Ruby Pendant */}
            <circle cx="120" cy="184" r="3.2" fill="url(#ganeshSindoor)" stroke="#FFEAA7" strokeWidth="0.8" />
          </g>

          {/* 5. Majestic Ears (Karna) with Ornate Contours and Jewels */}
          <g filter="url(#ganeshShadow)">
            {/* Right Ear (Devotee's Left) */}
            <path
              d="M86 86 C64 74 38 78 40 106 C42 122 55 133 80 131 C84 125 86 116 88 108 Z"
              fill="url(#ganeshGoldLight)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Inner Right Ear Contours */}
            <path
              d="M76 93 C60 88 49 94 50 110 C51 119 60 124 74 123"
              fill="none"
              stroke="#9C6410"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Right Ear Kundal / Earring */}
            <circle cx="48" cy="122" r="3" fill="url(#ganeshSindoor)" stroke="#FFEAA7" strokeWidth="0.8" />
            <path d="M48 125 L48 131" stroke="url(#ganeshGoldLight)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="48" cy="132" r="1.6" fill="#FFF9E0" />

            {/* Left Ear (Devotee's Right) */}
            <path
              d="M154 86 C176 74 202 78 200 106 C198 122 185 133 160 131 C156 125 154 116 152 108 Z"
              fill="url(#ganeshGoldLight)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Inner Left Ear Contours */}
            <path
              d="M164 93 C180 88 191 94 190 110 C189 119 180 124 166 123"
              fill="none"
              stroke="#9C6410"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Left Ear Kundal / Earring */}
            <circle cx="192" cy="122" r="3" fill="url(#ganeshSindoor)" stroke="#FFEAA7" strokeWidth="0.8" />
            <path d="M192 125 L192 131" stroke="url(#ganeshGoldLight)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="192" cy="132" r="1.6" fill="#FFF9E0" />
          </g>

          {/* 6. Elephant Head, Cheeks & Brow Dome (Gajanan) */}
          <g filter="url(#ganeshShadow)">
            <path
              d="M84 94 C82 122 88 140 102 142 C108 132 110 118 110 106 C110 88 98 76 84 94 Z"
              fill="url(#ganeshGoldLight)"
              opacity="0.95"
            />
            <path
              d="M156 94 C158 122 152 140 138 142 C132 132 130 118 130 106 C130 88 142 76 156 94 Z"
              fill="url(#ganeshGoldLight)"
              opacity="0.95"
            />
            {/* Central Forehead Dome */}
            <path
              d="M84 92 C84 66 100 58 120 58 C140 58 156 66 156 92 C156 112 148 124 138 134 C132 120 126 106 120 106 C114 106 108 120 102 134 C92 124 84 112 84 92 Z"
              fill="url(#ganeshGoldLight)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.4"
            />
          </g>

          {/* 7. Tusks (Danta) - Complete Right Tusk, Ekadanta Broken Left Tusk */}
          {/* Full Right Tusk (Devotee's Left) */}
          <path
            d="M93 126 C90 133 84 142 79 144 C81 138 87 130 94 125 Z"
            fill="url(#ganeshIvory)"
            stroke="#C9A050"
            strokeWidth="0.8"
          />
          {/* Broken Left Tusk (Ekadanta) */}
          <path
            d="M147 126 C150 131 154 133 158 134 L158 130 C154 128 150 126 146 125 Z"
            fill="url(#ganeshIvory)"
            stroke="#C9A050"
            strokeWidth="0.8"
          />

          {/* 8. Graceful Curved Trunk (Vakratunda) Sweeping to Left holding Modak */}
          <g filter="url(#ganeshShadow)">
            {/* Trunk Body Flow */}
            <path
              d="M112 108 C112 128 110 144 103 154 C94 167 78 163 76 148 C75 137 87 131 99 137 C104 139 107 145 106 149 C105 152 101 154 97 153 C92 152 90 146 94 143 C96 142 98 143 97 145 C94 147 96 150 99 149 C104 147 100 139 94 139 C83 139 77 147 80 156 C84 168 102 170 112 155 C121 142 127 124 128 108 Z"
              fill="url(#ganeshGoldDeep)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Sacred Ornamental Trunk Bands (Valaya) */}
            <path d="M114 116 C119 118 123 118 126 116" stroke="url(#ganeshGoldLight)" strokeWidth="2" strokeLinecap="round" />
            <path d="M112 124 C117 126 121 126 125 124" stroke="url(#ganeshGoldLight)" strokeWidth="2" strokeLinecap="round" />
            <path d="M109 133 C113 135 118 135 122 133" stroke="url(#ganeshGoldLight)" strokeWidth="2" strokeLinecap="round" />
            <path d="M104 143 C108 146 112 146 116 143" stroke="url(#ganeshGoldLight)" strokeWidth="1.8" strokeLinecap="round" />

            {/* Trunk Center Sacred Tilak Line */}
            <path
              d="M120 110 L120 128"
              stroke="url(#ganeshSindoor)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>

          {/* 9. Golden Sacred Modak (Sweet Divine Offering) in the Trunk Curl */}
          <g filter="url(#ganeshShadow)">
            <path
              d="M94 142 C91 138 93 131 98 126 C103 131 105 138 102 142 C99 145 96 144 94 142 Z"
              fill="url(#ganeshModakGrad)"
              stroke="#FFF2A3"
              strokeWidth="0.9"
            />
            {/* Modak Saffron Tip & Grooves */}
            <circle cx="98" cy="126" r="1.4" fill="url(#ganeshSindoor)" />
            <path d="M98 128 L98 141" stroke="#E69500" strokeWidth="0.6" opacity="0.8" />
            <path d="M95 133 C96 137 97 140 98 141" stroke="#E69500" strokeWidth="0.6" opacity="0.7" />
            <path d="M101 133 C100 137 99 140 98 141" stroke="#E69500" strokeWidth="0.6" opacity="0.7" />
          </g>

          {/* 10. Benevolent Divine Eyes (Peaceful Lotus Petal Eyes) */}
          <g>
            {/* Right Eye (Devotee's Left) */}
            <path
              d="M96 99 C101 95 107 96 110 100 C106 102 101 101 96 99 Z"
              fill="#2A040F"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1"
            />
            <path d="M94 95 C99 92 107 92 112 96" stroke="url(#ganeshGoldLight)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="104" cy="98.5" r="1.4" fill="#FFFFFF" />

            {/* Left Eye (Devotee's Right) */}
            <path
              d="M144 99 C139 95 133 96 130 100 C134 102 139 101 144 99 Z"
              fill="#2A040F"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1"
            />
            <path d="M146 95 C141 92 133 92 128 96" stroke="url(#ganeshGoldLight)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="136" cy="98.5" r="1.4" fill="#FFFFFF" />
          </g>

          {/* 11. Sacred Tripundra & Sindoor Tilak on Forehead (Bengali & Vedic Wedding Auspice) */}
          <g filter="url(#ganeshShadow)">
            {/* Three Sandalwood (Chandan) Arches */}
            <path
              d="M102 78 C110 74 130 74 138 78"
              fill="none"
              stroke="#FFF5CC"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M104 82 C112 79 128 79 136 82"
              fill="none"
              stroke="#FFF5CC"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M107 86 C113 84 127 84 133 86"
              fill="none"
              stroke="#FFF5CC"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Sacred Sindoor Flame / Teardrop Tilak */}
            <path
              d="M120 67 C116 75 114 83 120 89 C126 83 124 75 120 67 Z"
              fill="url(#ganeshSindoor)"
              stroke="#FFEAA7"
              strokeWidth="0.9"
            />
            {/* Glowing Bindu in Center */}
            <circle cx="120" cy="83" r="2.2" fill="#FFEAA7" />
            <circle cx="120" cy="83" r="1.2" fill="#FFFFFF" />
          </g>

          {/* 12. Majestic Royal Crown (Mukut) with Carved Filigree & Jewels */}
          <g filter="url(#ganeshShadow)">
            {/* Crown Base Rim / Diadem */}
            <path
              d="M86 63 C100 56 140 56 154 63 L152 56 C138 50 102 50 88 56 Z"
              fill="url(#ganeshGoldDeep)"
              stroke="url(#ganeshGoldLight)"
              strokeWidth="1.2"
            />
            {/* Diadem Gem Insets */}
            <circle cx="104" cy="58" r="1.8" fill="url(#ganeshSindoor)" />
            <circle cx="120" cy="56" r="2.4" fill="url(#ganeshSindoor)" stroke="#FFF8D6" strokeWidth="0.6" />
            <circle cx="136" cy="58" r="1.8" fill="url(#ganeshSindoor)" />

            {/* Crown Tier 1 (Lower Pagoda) */}
            <path
              d="M91 55 C96 42 106 39 120 38 C134 39 144 42 149 55 Z"
              fill="url(#ganeshGoldLight)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1.4"
            />
            <path
              d="M102 51 C110 45 130 45 138 51"
              fill="none"
              stroke="#8C5300"
              strokeWidth="1.2"
            />

            {/* Crown Tier 2 (Upper Dome) */}
            <path
              d="M99 39 C104 28 111 25 120 24 C129 25 136 28 141 39 Z"
              fill="url(#ganeshGoldDeep)"
              stroke="url(#ganeshGoldLight)"
              strokeWidth="1.3"
            />

            {/* Sacred Crown Pinnacle (Kalash / Chhatra Finial) */}
            <path
              d="M116 24 C116 17 120 12 120 12 C120 12 124 17 124 24 Z"
              fill="url(#ganeshGoldLight)"
              stroke="url(#ganeshStrokeGold)"
              strokeWidth="1"
            />
            {/* Pinnacle Ruby Jewel */}
            <circle cx="120" cy="18" r="2.2" fill="url(#ganeshSindoor)" stroke="#FFF9E0" strokeWidth="0.7" />
            {/* Crown Radiance Glint */}
            <line x1="120" y1="7" x2="120" y2="11" stroke="#FFF7D6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="114" y1="12" x2="117" y2="13" stroke="#FFF7D6" strokeWidth="1" strokeLinecap="round" />
            <line x1="126" y1="12" x2="123" y2="13" stroke="#FFF7D6" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* 13. Auspicious Om / Blessing Light Accent */}
          <circle cx="120" cy="120" r="1.5" fill="#FFEAA7" opacity="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

