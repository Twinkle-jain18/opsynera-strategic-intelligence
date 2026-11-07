import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, heading, subtitle, description }) {
  return (
    <section className="relative bg-[#071A3D] text-white pt-[110px] pb-14 lg:pt-[130px] lg:pb-18 overflow-hidden border-b-2 border-[#F4B323]/50">
      {/* Background dot telemetry pattern */}
      <div className="absolute inset-0 dot-matrix-dark opacity-30 pointer-events-none" />

      {/* Decorative gradient glow */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#F4B323]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-3xl">
          
          {/* Eyebrow / Tag */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2.5 mb-3.5"
            >
              <span className="w-6 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#F4B323] uppercase">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Main Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4"
          >
            {heading}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-[#F4B323] font-semibold mb-3 leading-snug"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Detailed Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              {description}
            </motion.p>
          )}

        </div>
      </div>
    </section>
  );
}
