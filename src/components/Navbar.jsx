import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck, Search, Globe, Zap, MapPin, BarChart2, Building2, Landmark, Monitor, Layers, Briefcase } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import OpsyneraLogo from './OpsyneraLogo';
import { services } from '../data/services';
import { industries } from '../data/industries';

const serviceIcons = {
  'strategic-risk-advisory': ShieldCheck,
  'due-diligence': Search,
  'osint-research': Globe,
  'cyber-digital-risk': Zap,
  'field-verification': MapPin,
  'corporate-intelligence': BarChart2,
};

const industryIcons = {
  Building2, Landmark, Monitor, Layers, Briefcase,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const location = useLocation();

  const servicesTimeoutRef = useRef(null);
  const industriesTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdown(false);
    setIndustriesDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleServicesEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesDropdown(true);
  };
  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesDropdown(false), 150);
  };

  const handleIndustriesEnter = () => {
    clearTimeout(industriesTimeoutRef.current);
    setIndustriesDropdown(true);
  };
  const handleIndustriesLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => setIndustriesDropdown(false), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-[0_4px_20px_rgba(7,26,61,0.06)] border-b border-slate-200/80 py-3' : 'border-b border-slate-100 py-4'
        }`}
        role="banner"
      >
        <div className="site-container flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex-shrink-0" aria-label="Opsynera Strategic Intelligence Advisory">
            <OpsyneraLogo size={38} />
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-[#071A3D]" aria-label="Main Navigation">
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative py-1.5 transition-colors ${
                  isActive ? 'text-[#071A3D] font-bold' : 'text-[#071A3D]/80 hover:text-[#071A3D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F4B323] rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-1.5 transition-colors ${
                  isActive ? 'text-[#071A3D] font-bold' : 'text-[#071A3D]/80 hover:text-[#071A3D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F4B323] rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* Services with Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-1.5 transition-colors ${
                    isActive || location.pathname.startsWith('/services')
                      ? 'text-[#071A3D] font-bold'
                      : 'text-[#071A3D]/80 hover:text-[#071A3D]'
                  }`
                }
              >
                Services
                <ChevronDown size={13} className={`transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-[#F4B323]' : ''}`} />
              </NavLink>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full -left-20 w-80 bg-white rounded-xl shadow-[0_16px_40px_rgba(7,26,61,0.14)] border border-slate-100 p-3 z-50"
                  >
                    <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#F4B323] px-3 py-1.5 border-b border-slate-100 mb-1">
                      Our Advisory Services
                    </div>
                    {services.map((s) => {
                      const Icon = serviceIcons[s.id] || ShieldCheck;
                      return (
                        <Link
                          key={s.id}
                          to={`/services#${s.slug}`}
                          className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-md bg-[#071A3D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4B323] transition-colors mt-0.5">
                            <Icon size={14} className="text-[#F4B323] group-hover:text-[#071A3D] transition-colors" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#071A3D] group-hover:text-[#071A3D] leading-tight">
                              {s.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {s.shortDesc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries with Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleIndustriesEnter}
              onMouseLeave={handleIndustriesLeave}
            >
              <NavLink
                to="/industries"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-1.5 transition-colors ${
                    isActive || location.pathname.startsWith('/industries')
                      ? 'text-[#071A3D] font-bold'
                      : 'text-[#071A3D]/80 hover:text-[#071A3D]'
                  }`
                }
              >
                Industries
                <ChevronDown size={13} className={`transition-transform duration-200 ${industriesDropdown ? 'rotate-180 text-[#F4B323]' : ''}`} />
              </NavLink>

              <AnimatePresence>
                {industriesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full -left-20 w-80 bg-white rounded-xl shadow-[0_16px_40px_rgba(7,26,61,0.14)] border border-slate-100 p-3 z-50"
                  >
                    <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#F4B323] px-3 py-1.5 border-b border-slate-100 mb-1">
                      Sectors We Serve
                    </div>
                    {industries.map((ind) => {
                      const Icon = industryIcons[ind.icon] || Building2;
                      return (
                        <Link
                          key={ind.id}
                          to={`/industries`}
                          className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-md bg-[#071A3D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4B323] transition-colors mt-0.5">
                            <Icon size={14} className="text-[#F4B323] group-hover:text-[#071A3D] transition-colors" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#071A3D] group-hover:text-[#071A3D] leading-tight">
                              {ind.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {ind.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative py-1.5 transition-colors ${
                  isActive ? 'text-[#071A3D] font-bold' : 'text-[#071A3D]/80 hover:text-[#071A3D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F4B323] rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* LinkedIn Button (Pill outline) */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-outline text-xs px-4 py-2 flex items-center gap-2"
              aria-label="Connect on LinkedIn"
            >
              <span className="w-4 h-4 rounded-sm bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold">
                in
              </span>
              <span>Connect on LinkedIn</span>
            </a>

            {/* Get in Touch Button (Gold pill) */}
            <Link
              to="/contact"
              className="btn-gold text-xs px-5 py-2 flex items-center gap-1.5"
            >
              Get in Touch <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-[#071A3D] hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden pt-[76px]"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-base font-bold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#F4B323]' : 'text-[#071A3D]'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-base font-bold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#F4B323]' : 'text-[#071A3D]'
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-base font-bold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#F4B323]' : 'text-[#071A3D]'
                  }`
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/industries"
                className={({ isActive }) =>
                  `text-base font-bold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#F4B323]' : 'text-[#071A3D]'
                  }`
                }
              >
                Industries Served
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-base font-bold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#F4B323]' : 'text-[#071A3D]'
                  }`
                }
              >
                Contact
              </NavLink>

              <div className="pt-4 flex flex-col gap-3">
                <Link to="/contact" className="btn-gold justify-center w-full py-3">
                  Get in Touch →
                </Link>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-outline justify-center w-full py-3"
                >
                  <span className="w-4 h-4 rounded-sm bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold">
                    in
                  </span>
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
