import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompassEmblem } from '../components/OpsyneraLogo';

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] bg-[#071A3D] flex flex-col items-center justify-center select-none"
        >
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Compass Emblem with subtle pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 drop-shadow-[0_8px_24px_rgba(244,179,35,0.35)]"
            >
              <CompassEmblem size={72} />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-[0.22em] mb-2">
                OPSYNERA
              </h1>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#F4B323]">
                Strategic Intelligence Advisory
              </p>
            </motion.div>

            {/* Subtle Progress Line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-[#F4B323] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
