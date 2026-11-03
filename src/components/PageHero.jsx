import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, heading, subtitle, description }) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#0B1626',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <div className="hero-grid" style={{ position: 'absolute', inset: 0 }} />

      {/* Very faint watermark — no more bleeding through */}
      <div
        style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '280px',
          height: '280px',
          backgroundImage: 'url(/logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.025,
          pointerEvents: 'none',
        }}
      />

      {/* Content — compact padding */}
      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 2,
          /* 68px navbar clearance + 36px breathing room = 104px top */
          paddingTop: '104px',
          paddingBottom: '44px',
        }}
      >
        {eyebrow && (
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.07 }}
          style={{
            fontFamily: 'Manrope, sans-serif',
            /* Inner pages: 30px mobile → 40px desktop */
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: subtitle || description ? '12px' : 0,
            maxWidth: '680px',
          }}
        >
          {heading}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            style={{
              fontSize: '16px',
              color: '#B59A67',
              fontWeight: 400,
              marginBottom: description ? '8px' : 0,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.21 }}
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: 1.75,
              maxWidth: '540px',
              fontWeight: 400,
            }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
