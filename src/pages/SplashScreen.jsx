import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 60);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 450);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle radial light wash */}
          <div className="absolute inset-0 bg-radial from-slate-100/80 via-transparent to-transparent pointer-events-none" />

          {/* Animated Background Radar / Coordinate Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="w-[420px] h-[420px] rounded-full border border-dashed border-[#C49A6C]/50 flex items-center justify-center"
            >
              <div className="w-[300px] h-[300px] rounded-full border border-slate-300/60" />
            </motion.div>
          </div>

          <div className="relative z-10 flex flex-col items-center">

            {/* Logo Presentation Container */}
            <div className="relative mb-8 flex items-center justify-center">

              {/* Expanding Pulse Ring 1 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.85, 1.4, 1.7], opacity: [0.4, 0.15, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                className="absolute w-44 h-44 rounded-full border border-[#C49A6C]/40 pointer-events-none"
              />

              {/* Expanding Pulse Ring 2 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.85, 1.25, 1.5], opacity: [0.5, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: 0.7, ease: 'easeOut' }}
                className="absolute w-44 h-44 rounded-full border border-[#071A3D]/20 pointer-events-none"
              />

              {/* Glowing Aura */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute w-48 h-48 bg-gradient-to-tr from-[#1676C5]/15 to-[#C49A6C]/15 rounded-full blur-2xl pointer-events-none"
              />

              {/* Logo — no mixBlendMode on white background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-40 h-40 sm:w-48 sm:h-48 overflow-hidden rounded-2xl flex items-center justify-center"
              >
                <img
                  src={logoImg}
                  alt="Opsynera"
                  className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(7,26,61,0.18)]"
                  onError={(e) => {
                    e.currentTarget.src = '/logo.png';
                  }}
                />

                {/* Shimmer sweep */}
                <motion.div
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-25 pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-center"
            >
              <motion.h1
                initial={{ letterSpacing: '0.14em' }}
                animate={{ letterSpacing: '0.24em' }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#071A3D] tracking-[0.24em] mb-2.5"
              >
                OPSYNERA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-[#C49A6C]"
              >
                Strategic Intelligence Advisory
              </motion.p>
            </motion.div>

            {/* Progress Track */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-col items-center w-56 sm:w-64"
            >
              <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1676C5] via-[#C49A6C] to-[#C49A6C] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex items-center justify-between w-full mt-2.5 text-[10px] font-mono tracking-wider text-slate-400">
                <span className="uppercase text-[9px] tracking-[0.16em]">
                  {progress < 100 ? 'Initializing Environment' : 'Advisory Active'}
                </span>
                <span className="text-[#C49A6C] font-bold">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
