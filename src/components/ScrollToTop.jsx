import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures proper scroll positioning on route changes and link clicks:
 * 1. For route changes WITHOUT a hash (e.g. /contact, /about, /services, /, /privacy-policy),
 *    it resets window scroll to the top (0, 0).
 * 2. For same-page clicks to the current route without a hash (e.g. clicking "Contact" or
 *    "Initiate Inquiry" in the footer while already on /contact), it scrolls smoothly to top (0, 0).
 * 3. For hash routes (e.g. /services#due-diligence), it allows useHashScrollAndHighlight
 *    to handle scrolling directly to the target element.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  // Scroll to top on route change when there is no hash anchor
  useEffect(() => {
    // Disable browser's automatic scroll restoration on SPA navigation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname, search, hash]);

  // Handle same-page anchor clicks (e.g. clicking a link to the current page while scrolled down)
  useEffect(() => {
    const handleSamePageClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore mailto, tel, or external blank targets
      if (href.startsWith('mailto:') || href.startsWith('tel:') || anchor.target === '_blank') {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);

        // Same origin and same pathname with NO hash
        if (
          targetUrl.origin === window.location.origin &&
          targetUrl.pathname === window.location.pathname &&
          !targetUrl.hash
        ) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      } catch {
        // Ignore URL parsing errors
      }
    };

    document.addEventListener('click', handleSamePageClick);
    return () => document.removeEventListener('click', handleSamePageClick);
  }, []);

  return null;
}
