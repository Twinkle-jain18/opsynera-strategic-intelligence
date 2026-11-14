import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const STYLES = {
  success: {
    bar:  'bg-emerald-500',
    icon: <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />,
    ring: 'border-emerald-200',
    bg:   'bg-white',
  },
  error: {
    bar:  'bg-red-500',
    icon: <AlertCircle size={18} className="text-red-500 flex-shrink-0" />,
    ring: 'border-red-200',
    bg:   'bg-white',
  },
  warning: {
    bar:  'bg-amber-400',
    icon: <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />,
    ring: 'border-amber-200',
    bg:   'bg-white',
  },
  info: {
    bar:  'bg-blue-500',
    icon: <Info size={18} className="text-blue-500 flex-shrink-0" />,
    ring: 'border-blue-200',
    bg:   'bg-white',
  },
};

function Toast({ id, message, type, duration }) {
  const { removeToast } = useToast();
  const [progress, setProgress] = useState(100);
  const style = STYLES[type] || STYLES.info;

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct > 0) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{    opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={`relative w-80 rounded-2xl border shadow-xl overflow-hidden ${style.bg} ${style.ring}`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100">
        <div
          className={`h-full ${style.bar} transition-none`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 px-4 pt-5 pb-4">
        {style.icon}
        <p className="flex-1 text-sm font-semibold text-[#071A3D] leading-snug pt-0.5">
          {message}
        </p>
        <button
          onClick={() => removeToast(id)}
          className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-[#071A3D] hover:bg-slate-100 transition-colors mt-0.5"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 items-end pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
