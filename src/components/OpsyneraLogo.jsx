import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function OpsyneraLogo({ dark = false, size = 42, showSubtitle = true, className = "" }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Company Official Crest Container */}
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105 shadow-sm overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#071A3D',
          border: '1px solid rgba(244, 179, 35, 0.4)',
        }}
      >
        <img
          src={logoImg}
          alt="Opsynera Logo"
          className="w-full h-full object-contain"
          style={{ mixBlendMode: 'screen', transform: 'scale(1.15)' }}
          onError={(e) => {
            // Fallback to public path if needed
            e.currentTarget.src = '/logo.png';
          }}
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-heading font-black tracking-[0.18em] text-[15px] sm:text-[17px] leading-tight ${
            dark ? 'text-white' : 'text-[#071A3D]'
          }`}
          style={{ letterSpacing: '0.18em' }}
        >
          OPSYNERA
        </span>
        {showSubtitle && (
          <span
            className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.14em] uppercase leading-none mt-1 ${
              dark ? 'text-[#F4B323]' : 'text-[#071A3D]/70'
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
