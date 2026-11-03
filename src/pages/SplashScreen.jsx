import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 480);
    }, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            /* Solid background — NO grid pattern, so PNG background matches */
            background: '#0B1626',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Logo fills its own square — no floating against a pattern */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '200px',
                height: '200px',
                overflow: 'hidden',
                marginBottom: '28px',
              }}
            >
              <img
                src="/logo.png"
                alt="Opsynera"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <h1 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '26px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.22em',
                marginBottom: '8px',
              }}>
                OPSYNERA
              </h1>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#B59A67',
              }}>
                Strategic Intelligence Advisory
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{
                marginTop: '36px',
                width: '100px',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.72, duration: 1.5, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#B59A67' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
