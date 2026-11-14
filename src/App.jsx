import { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
        <Routes location={location}>
          <Route path="/"              element={<Home />} />
          <Route path="/about"         element={<About />} />
          <Route path="/services"      element={<Services />} />
          <Route path="/industries"    element={<Industries />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [splashDone,     setSplashDone]     = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoggedIn,  setAdminLoggedIn]  = useState(false);

  // 6-click secret trigger — resets after 2 seconds of inactivity
  const [clickCount, setClickCount]   = useState(0);
  const [clickTimer, setClickTimer]   = useState(null);

  const handleLogoSecretClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      // Reset timer on each click
      clearTimeout(clickTimer);
      const t = setTimeout(() => setClickCount(0), 2000);
      setClickTimer(t);

      if (next >= 6) {
        setClickCount(0);
        clearTimeout(t);
        if (!adminLoggedIn) setShowAdminLogin(true);
        else setAdminLoggedIn(false); // already logged in → toggle off
      }
      return next;
    });
  }, [clickTimer, adminLoggedIn]);

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
  };

  return (
    <>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Main Site */}
      {splashDone && (
        <div className="flex flex-col min-h-screen">
          <Navbar onLogoClick={handleLogoSecretClick} />
          <div className="flex-1">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      )}

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && !adminLoggedIn && (
          <AdminLogin
            onSuccess={handleLoginSuccess}
            onClose={() => setShowAdminLogin(false)}
          />
        )}
      </AnimatePresence>

      {/* Admin Panel Full-Screen Overlay */}
      <AnimatePresence>
        {adminLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminPanel onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
