export function CompassEmblem({ size = 38, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer subtle orbital ring */}
      <circle cx="50" cy="50" r="34" stroke="#F4B323" strokeWidth="2.2" strokeOpacity="0.8" />
      
      {/* Secondary diagonal star points */}
      <polygon
        points="50,22 55,45 78,50 55,55 50,78 45,55 22,50 45,45"
        fill="#F4B323"
        fillOpacity="0.45"
      />
      <polygon
        points="50,22 55,45 78,50 55,55 50,78 45,55 22,50 45,45"
        stroke="#F4B323"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Primary 4 elongated compass points */}
      <polygon
        points="50,4 56,44 96,50 56,56 50,96 44,56 4,50 44,44"
        fill="#F4B323"
      />
      <polygon
        points="50,4 56,44 96,50 56,56 50,96 44,56 4,50 44,44"
        stroke="#E0A218"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Dimensional shade on left half of vertical points */}
      <polygon points="50,4 44,44 50,50" fill="#E0A218" />
      <polygon points="50,96 56,56 50,50" fill="#E0A218" />
      <polygon points="4,50 44,56 50,50" fill="#E0A218" />
      <polygon points="96,50 56,44 50,50" fill="#E0A218" />

      {/* Center inner ring */}
      <circle cx="50" cy="50" r="11" fill="#FFFFFF" stroke="#071A3D" strokeWidth="2" />
      
      {/* Inner tiny star */}
      <polygon points="50,42 52,48 58,50 52,52 50,58 48,52 42,50 48,48" fill="#071A3D" />
      <circle cx="50" cy="50" r="2.2" fill="#F4B323" />
    </svg>
  );
}

export default function OpsyneraLogo({ dark = false, size = 38, showSubtitle = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <CompassEmblem size={size} className="flex-shrink-0 transition-transform duration-300 hover:rotate-45" />
      <div className="flex flex-col justify-center">
        <span
          className={`font-manrope font-extrabold tracking-[0.18em] text-[15px] sm:text-[17px] leading-tight ${
            dark ? 'text-white' : 'text-[#071A3D]'
          }`}
          style={{ letterSpacing: '0.18em' }}
        >
          OPSYNERA
        </span>
        {showSubtitle && (
          <span
            className={`text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase leading-none mt-1 ${
              dark ? 'text-slate-400' : 'text-[#071A3D]/70'
            }`}
            style={{ letterSpacing: '0.14em' }}
          >
            Strategic Intelligence Advisory
          </span>
        )}
      </div>
    </div>
  );
}
