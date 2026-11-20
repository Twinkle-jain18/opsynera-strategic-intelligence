import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
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

// Only this UID is authorised to access the admin panel.
// All other authenticated Firebase users are rejected at the frontend.
// Final enforcement is done by Firestore Security Rules (Phase 5).
const AUTHORISED_ADMIN_UID = 'A0IdyBXXwjODn1noyaQjRiGIUQg2';

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
  // null = still checking Firebase session | false = not logged in | true = authorised admin
  const [authChecked,    setAuthChecked]    = useState(false);

  // 6-click secret trigger — resets after 2 seconds of inactivity
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  // ── Persistent session via Firebase onAuthStateChanged ──────────
  // Runs once on mount; keeps admin logged in across page refreshes.
  // If the UID does not match AUTHORISED_ADMIN_UID, treat as not logged in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === AUTHORISED_ADMIN_UID) {
        setAdminLoggedIn(true);
        setShowAdminLogin(false);
      } else {
        setAdminLoggedIn(false);
        // If a non-authorised Firebase user somehow signed in, sign them out silently
        if (user && user.uid !== AUTHORISED_ADMIN_UID) {
          signOut(auth);
        }
      }
      setAuthChecked(true);
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  const handleLogoSecretClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      clearTimeout(clickTimer);
      const t = setTimeout(() => setClickCount(0), 2000);
      setClickTimer(t);

      if (next >= 6) {
        setClickCount(0);
        clearTimeout(t);
        if (!adminLoggedIn) setShowAdminLogin(true);
        else handleLogout();
      }
      return next;
    });
  }, [clickTimer, adminLoggedIn]);

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setAdminLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
    setAdminLoggedIn(false);
  };

  return (
    <>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Main Site */}
      {splashDone && (
        <div className="flex flex-col min-h-screen relative">
          <Navbar onLogoClick={handleLogoSecretClick} />

          <div className="flex-1">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      )}

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && !adminLoggedIn && authChecked && (
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
