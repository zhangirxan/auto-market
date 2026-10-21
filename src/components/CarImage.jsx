// Side-view illustration, shape depends on body type, paint on the car's color.
const PAINT = {
  White: '#f1f5f9', Black: '#1f2937', Silver: '#cbd5e1', Gray: '#6b7280',
  Blue: '#2563eb', Red: '#dc2626', Green: '#16a34a', Beige: '#d6c3a1',
}

const CABINS = {
  Sedan: 'M58 46 L78 26 L128 26 L152 46 Z',
  Hatchback: 'M58 46 L76 25 L146 25 L158 46 Z',
  Coupe: 'M66 46 L92 28 L124 28 L156 46 Z',
  Wagon: 'M54 46 L72 25 L170 25 L176 46 Z',
  SUV: 'M48 42 L62 18 L160 18 L168 42 Z',
  Pickup: 'M46 42 L60 18 L106 18 L112 42 Z',
}

export default function CarImage({ body, color, className = '' }) {
  const paint = PAINT[color] ?? '#94a3b8'
  const tall = body === 'SUV' || body === 'Pickup'
  const top = tall ? 40 : 44

  return (
    <div className={`car-image ${className}`}>
      <svg viewBox="0 0 220 100" role="img" aria-label={`${color} ${body}`}>
        <ellipse cx="110" cy="84" rx="92" ry="6" fill="rgba(0,0,0,0.12)" />
        <path d={CABINS[body] ?? CABINS.Sedan} fill={paint} stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
        <path
          d={(CABINS[body] ?? CABINS.Sedan)}
          fill="#dbeafe"
          opacity="0.95"
          transform="translate(110 40) scale(0.86) translate(-110 -40)"
        />
        <rect x="18" y={top} width="184" height={76 - top} rx="12" fill={paint} stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
        {body === 'Pickup' && <rect x="116" y={top - 6} width="86" height="8" rx="2" fill={paint} stroke="rgba(0,0,0,0.25)" />}
        <rect x="190" y={top + 8} width="10" height="6" rx="2" fill="#fde68a" />
        <rect x="20" y={top + 8} width="8" height="6" rx="2" fill="#f87171" />
        {[60, 162].map((x) => (
          <g key={x}>
            <circle cx={x} cy="76" r="15" fill="#111827" />
            <circle cx={x} cy="76" r="6" fill="#9ca3af" />
          </g>
        ))}
      </svg>
    </div>
  )
}
