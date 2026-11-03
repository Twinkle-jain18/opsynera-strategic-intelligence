import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: solid ? '#0B1626' : 'transparent',
          borderBottom: solid ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
        role="banner"
      >
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }} aria-label="Opsynera Home">
            <img src="/logo.png" alt="Opsynera" style={{ height: '38px', width: '38px', objectFit: 'contain', mixBlendMode: 'screen' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', letterSpacing: '0.18em', color: '#ffffff' }}>OPSYNERA</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B59A67', marginTop: '3px' }}>Strategic Intelligence Advisory</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '32px' }} aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: isActive ? '#B59A67' : '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                })}
                onMouseOver={(e) => { if (e.target.style.color === 'rgb(148, 163, 184)') e.target.style.color = '#ffffff'; }}
                onMouseOut={(e) => { if (e.target.style.color === 'rgb(255, 255, 255)') e.target.style.color = '#94a3b8'; }}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary" style={{ marginLeft: '8px', padding: '10px 22px', fontSize: '13px' }}>
              Get in Touch
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '8px' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: '#0B1626',
              display: 'flex', flexDirection: 'column',
              paddingTop: '100px', paddingBottom: '40px',
              paddingLeft: '24px', paddingRight: '24px',
              overflowY: 'auto',
            }}
            role="dialog"
            aria-modal="true"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: isActive ? '#B59A67' : '#94a3b8',
                    textDecoration: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginTop: '32px' }}>
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 28px', fontSize: '15px' }}>
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
