import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './pages/AdminPanel';

// Fallback bootstrap UID used only during first-time database provisioning
const BOOTSTRAP_ADMIN_UID = 'A0IdyBXXwjODn1noyaQjRiGIUQg2';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }}
    >
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

  // Detect whether current session is a page reload (F5 / browser refresh)
  const [isReload] = useState(() => {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry && navEntry.type === 'reload') return true;
      if (window.performance?.navigation?.type === 1) return true;
    } catch {
      // fallback
    }
    return false;
  });

  // Lock body scroll while splash screen is running
  useEffect(() => {
    if (!splashDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [splashDone]);

  // 6-click secret trigger — resets after 2 seconds of inactivity
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  // ── Database-backed Admin Verification via onAuthStateChanged ──
  // Checks Firestore `/admins/{uid}` to verify authorization and status in the DB.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const adminDocRef = doc(db, 'admins', user.uid);
          let adminSnap = await getDoc(adminDocRef);

          // Bootstrap initial admin record in Firestore DB if it does not yet exist
          if (!adminSnap.exists() && user.uid === BOOTSTRAP_ADMIN_UID) {
            const initialAdminData = {
              uid: user.uid,
              email: user.email || 'opsynerastatintadvisory@gmail.com',
              role: 'superadmin',
              isActive: true,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            };
            try {
              await setDoc(adminDocRef, initialAdminData);
              adminSnap = await getDoc(adminDocRef);
            } catch (initErr) {
              console.warn('Initial admin DB record bootstrap note:', initErr);
            }
          }

          if (adminSnap.exists() && adminSnap.data()?.isActive !== false) {
            setAdminLoggedIn(true);
            setShowAdminLogin(false);
            // Update lastLogin timestamp in database
            setDoc(adminDocRef, { lastLogin: serverTimestamp() }, { merge: true }).catch(() => {});
          } else {
            setAdminLoggedIn(false);
            await signOut(auth);
          }
        } catch (err) {
          console.error('Error verifying admin authorization in DB:', err);
          // Fallback during bootstrap
          if (user.uid === BOOTSTRAP_ADMIN_UID) {
            setAdminLoggedIn(true);
            setShowAdminLogin(false);
          } else {
            setAdminLoggedIn(false);
            await signOut(auth);
          }
        }
      } else {
        setAdminLoggedIn(false);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
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
      <ScrollToTop />
      {/* Splash Screen Overlay */}
      {!splashDone && (
        <SplashScreen
          onComplete={() => setSplashDone(true)}
          isReload={isReload}
        />
      )}

      {/* Main Site — rendered behind splash so Navbar coordinates can be measured */}
      <div className={`flex flex-col min-h-screen relative ${!splashDone ? 'pointer-events-none select-none' : ''}`}>
        <Navbar
          onLogoClick={handleLogoSecretClick}
          splashDone={splashDone}
          isReload={isReload}
        />

        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>

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
