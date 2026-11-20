import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to smoothly scroll to a hash target on page load or navigation,
 * and trigger a glowing highlight effect on the target element.
 */
export function useHashScrollAndHighlight() {
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);
  const activeTimerRef = useRef(null);

  const performScrollAndHighlight = useCallback((hashId) => {
    if (!hashId) return;
    const cleanId = String(hashId).replace(/^#/, '').trim();
    if (!cleanId) return;

    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const el = document.getElementById(cleanId);
      if (el) {
        // Compute offset to clear sticky header
        const navHeight = window.innerWidth >= 1024 ? 92 : 80;
        const rect = el.getBoundingClientRect();
        const targetTop = rect.top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });

        // Trigger the glowing animation
        setHighlightedId(cleanId);

        if (activeTimerRef.current) {
          clearTimeout(activeTimerRef.current);
        }

        activeTimerRef.current = setTimeout(() => {
          setHighlightedId((curr) => (curr === cleanId ? null : curr));
        }, 3800);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 60);
      }
    };

    // Small delay to allow AnimatePresence / DOM mounting
    const timer = setTimeout(tryScroll, 120);
    return () => clearTimeout(timer);
  }, []);

  // Listen to router location changes
  useEffect(() => {
    if (location.hash) {
      return performScrollAndHighlight(location.hash);
    }
  }, [location.hash, location.pathname, performScrollAndHighlight]);

  // Listen for custom trigger (e.g., clicking dropdown link when already on the target page)
  useEffect(() => {
    const handleCustomNav = (e) => {
      if (e.detail?.id) {
        performScrollAndHighlight(e.detail.id);
      }
    };
    window.addEventListener('hash-nav', handleCustomNav);
    return () => window.removeEventListener('hash-nav', handleCustomNav);
  }, [performScrollAndHighlight]);

  return highlightedId;
}

export default useHashScrollAndHighlight;
