import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function SplashScreen({ onComplete, isReload = false }) {
  const [progress, setProgress] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [crestDelta, setCrestDelta] = useState(null);
  const [textDelta, setTextDelta] = useState(null);

  const splashCrestRef = useRef(null);
  const splashTextRef = useRef(null);

  // 1. Progress increment logic
  useEffect(() => {
    // Shorter loading on reload (~0.8s) vs initial visit (~2.0s)
    const intervalMs = isReload ? 35 : 55;
    const minStep = isReload ? 8 : 4;
    const maxStep = isReload ? 18 : 9;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
        return Math.min(prev + step, 100);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isReload]);

  // 2. Trigger flight when progress reaches 100%
  useEffect(() => {
    if (progress < 100) return;

    // Small delay to let the user see 100% / 'Advisory Active'
    const prepTimer = setTimeout(() => {
      const navCrestEl = document.getElementById('nav-logo-crest');
      const navTextEl = document.getElementById('nav-logo-text');
      const splashCrestEl = splashCrestRef.current;
      const splashTextEl = splashTextRef.current;

      if (navCrestEl && splashCrestEl) {
        const navRect = navCrestEl.getBoundingClientRect();
        const splashRect = splashCrestEl.getBoundingClientRect();

        // Calculate translation deltas between centers
        const dx = (navRect.left + navRect.width / 2) - (splashRect.left + splashRect.width / 2);
        const dy = (navRect.top + navRect.height / 2) - (splashRect.top + splashRect.height / 2);
        const scale = navRect.width / splashRect.width;

        setCrestDelta({ x: dx, y: dy, scale });
      }

      // For first load: measure destination for the brand text
      if (!isReload && navTextEl && splashTextEl) {
        const navTextRect = navTextEl.getBoundingClientRect();
        const splashTextRect = splashTextEl.getBoundingClientRect();

        const dx = navTextRect.left - splashTextRect.left;
        const dy = (navTextRect.top + navTextRect.height / 2) - (splashTextRect.top + splashTextRect.height / 2);
        const scale = navTextRect.height / splashTextRect.height;

        setTextDelta({ x: dx, y: dy, scale });
      }

      // Start flight animation
      setIsFlying(true);

      // Complete handover at end of flight animation
      const flightDuration = isReload ? 800 : 850;
      const completeTimer = setTimeout(() => {
        try {
          sessionStorage.setItem('opsynera_initial_loaded', 'true');
        } catch {
          // ignore storage issues
        }
        onComplete?.();
      }, flightDuration);

      return () => clearTimeout(completeTimer);
    }, 120);

    return () => clearTimeout(prepTimer);
  }, [progress, isReload, onComplete]);

  return (
    <motion.div
      key="splash-overlay"
      initial={{ opacity: 1 }}
      animate={isFlying ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: isReload ? 0.8 : 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
    >
      {/* Subtle radial light wash */}
      <div className="absolute inset-0 bg-radial from-slate-100/80 via-transparent to-transparent pointer-events-none" />

      {/* Animated Background Radar / Coordinate Rings */}
      <motion.div
        animate={isFlying ? { opacity: 0, scale: 0.8 } : { opacity: 0.25, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="w-[420px] h-[420px] rounded-full border border-dashed border-[#C49A6C]/50 flex items-center justify-center"
        >
          <div className="w-[300px] h-[300px] rounded-full border border-slate-300/60" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Logo Presentation Container */}
        <div className="relative mb-6 flex items-center justify-center">

          {/* Expanding Pulse Rings */}
          <motion.div
            animate={isFlying ? { opacity: 0 } : { opacity: [0.4, 0.15, 0], scale: [0.85, 1.4, 1.7] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            className="absolute w-44 h-44 rounded-full border border-[#C49A6C]/40 pointer-events-none"
          />

          <motion.div
            animate={isFlying ? { opacity: 0 } : { opacity: [0.5, 0.2, 0], scale: [0.85, 1.25, 1.5] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.7, ease: 'easeOut' }}
            className="absolute w-44 h-44 rounded-full border border-[#071A3D]/20 pointer-events-none"
          />

          {/* Glowing Aura */}
          <motion.div
            animate={isFlying ? { opacity: 0 } : { opacity: [0.2, 0.45, 0.2], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute w-48 h-48 bg-gradient-to-tr from-[#1676C5]/15 to-[#C49A6C]/15 rounded-full blur-2xl pointer-events-none"
          />

          {/* Central Logo Crest — Navigates to Navbar on completion */}
          <motion.div
            ref={splashCrestRef}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={
              isFlying && crestDelta
                ? {
                    opacity: 1,
                    x: crestDelta.x,
                    y: crestDelta.y,
                    scale: crestDelta.scale,
                    borderRadius: 12,
                    boxShadow: '0 1px 3px rgba(7, 26, 61, 0.1)',
                  }
                : { opacity: 1, scale: 1, x: 0, y: 0 }
            }
            transition={
              isFlying
                ? { duration: isReload ? 0.8 : 0.85, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden bg-[#071A3D] border border-[rgba(244,179,35,0.4)] shadow-[0_12px_32px_rgba(7,26,61,0.22)]"
            style={{ transformOrigin: 'center center' }}
          >
            <img
              src={logoImg}
              alt="Opsynera"
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'screen', transform: 'scale(1.15)' }}
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />

            {/* Shimmer sweep */}
            {!isFlying && (
              <motion.div
                initial={{ x: '-150%' }}
                animate={{ x: '150%' }}
                transition={{ delay: 0.4, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-25 pointer-events-none"
              />
            )}
          </motion.div>
        </div>

        {/* Wordmark & Subtitle */}
        <div className="text-center relative">
          {/* Main Brand Name */}
          <motion.div
            ref={splashTextRef}
            initial={{ opacity: 0, y: 10 }}
            animate={
              isFlying
                ? isReload
                  ? { opacity: 0, scale: 0.95, y: -4 }
                  : textDelta
                  ? {
                      opacity: 1,
                      x: textDelta.x,
                      y: textDelta.y,
                      scale: textDelta.scale,
                      letterSpacing: '0.18em',
                    }
                  : { opacity: 0 }
                : { opacity: 1, y: 0, scale: 1, x: 0 }
            }
            transition={
              isFlying
                ? isReload
                  ? { duration: 0.45, ease: 'easeOut' }
                  : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                : { delay: 0.25, duration: 0.55 }
            }
            style={{ transformOrigin: 'left center' }}
            className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#071A3D] tracking-[0.24em] mb-1.5"
          >
            OPSYNERA
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isFlying ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
            transition={isFlying ? { duration: 0.25 } : { delay: 0.4, duration: 0.4 }}
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-[#C49A6C]"
          >
            Strategic Intelligence Advisory
          </motion.p>
        </div>

        {/* Progress Track */}
        <motion.div
          animate={isFlying ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-7 flex flex-col items-center w-56 sm:w-64"
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
  );
}
