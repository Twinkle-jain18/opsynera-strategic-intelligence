import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, X, AlertCircle, Lock, Mail, ArrowLeft } from 'lucide-react';

const ADMIN_CREDENTIALS = { username: 'admin', password: 'Ops@Admin#2025' };
const RECOVERY_EMAIL    = 'opsynerastatintadvisory@gmail.com';

export default function AdminLogin({ onSuccess, onClose }) {
  const [view,     setView]     = useState('login');   // 'login' | 'forgot' | 'sent'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked,   setLocked]   = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [view]);

  useEffect(() => {
    if (!locked) return;
    const id = setInterval(() => {
      setLockTimer((t) => {
        if (t <= 1) { setLocked(false); setAttempts(0); clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [locked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onSuccess();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 3) {
        setLocked(true);
        setLockTimer(30);
        setError('Too many failed attempts. Access locked for 30 seconds.');
      } else {
        setError(`Invalid credentials. ${3 - next} attempt${3 - next !== 1 ? 's' : ''} remaining.`);
      }
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // Open mailto as fallback for no-backend environment
    window.open(
      `mailto:${RECOVERY_EMAIL}?subject=Admin%20Password%20Recovery%20Request&body=Please%20help%20me%20recover%20my%20Opsynera%20admin%20panel%20password.`,
      '_blank'
    );
    setView('sent');
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(7,26,61,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#071A3D] px-7 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C49A6C]/20 border border-[#C49A6C]/30 flex items-center justify-center">
              {view === 'forgot' || view === 'sent' ? <Mail size={20} className="text-[#C49A6C]" /> : <Shield size={20} className="text-[#C49A6C]" />}
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.25em] text-[#C49A6C] uppercase leading-none">Restricted Access</p>
              <h2 className="text-white font-bold text-base tracking-wide">
                {view === 'login' ? 'Admin Portal' : view === 'forgot' ? 'Recover Password' : 'Email Sent'}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={16} className="text-white" />
          </button>
        </div>

        <AnimatePresence mode="wait">

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="px-7 py-7 space-y-5"
            >
              {/* Lock notice */}
              {locked && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <Lock size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700 font-medium">
                    Access locked. Try again in <span className="font-black">{lockTimer}s</span>.
                  </p>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && !locked && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-700">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-[#071A3D] tracking-wide uppercase mb-1.5">Username</label>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  autoComplete="username"
                  disabled={locked || loading}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[#071A3D] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D] transition-all disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#071A3D] tracking-wide uppercase">Password</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[11px] font-semibold text-[#C49A6C] hover:text-[#B5895E] hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    autoComplete="current-password"
                    disabled={locked || loading}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-[#071A3D] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D] transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-[#071A3D] transition-colors"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={locked || loading || !username || !password}
                className="w-full py-3.5 rounded-xl bg-[#071A3D] text-white font-bold text-sm tracking-wide hover:bg-[#0B2450] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Authenticating…</>
                ) : (
                  <><Shield size={15} />Sign In to Admin Panel</>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400">Restricted access only. Unauthorised attempts are logged.</p>
            </motion.form>
          )}

          {/* ── FORGOT PASSWORD VIEW ── */}
          {view === 'forgot' && (
            <motion.form
              key="forgot"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleForgot}
              className="px-7 py-7 space-y-5"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-4 text-xs text-blue-800 leading-relaxed">
                A password recovery request will be sent to the registered admin email address. You will receive instructions to regain access.
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071A3D] tracking-wide uppercase mb-1.5">Recovery Email</label>
                <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm font-mono select-all">
                  {RECOVERY_EMAIL}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Recovery instructions will be delivered to this address.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#071A3D] text-white font-bold text-sm tracking-wide hover:bg-[#0B2450] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending…</>
                ) : (
                  <><Mail size={15} />Send Recovery Email</>
                )}
              </button>

              <button type="button" onClick={() => setView('login')} className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#071A3D] transition-colors">
                <ArrowLeft size={13} /> Back to Sign In
              </button>
            </motion.form>
          )}

          {/* ── EMAIL SENT VIEW ── */}
          {view === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="px-7 py-10 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Mail size={26} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-[#071A3D] font-extrabold text-base mb-1">Recovery Email Sent</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Instructions have been dispatched to<br />
                  <span className="font-bold text-[#071A3D]">{RECOVERY_EMAIL}</span>
                </p>
              </div>
              <p className="text-[10px] text-slate-400">Check your inbox and follow the steps to reset your password.</p>
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-1.5 text-xs font-bold text-[#C49A6C] hover:underline"
              >
                <ArrowLeft size={12} /> Return to Sign In
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
