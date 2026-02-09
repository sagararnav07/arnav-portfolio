import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll wrapper.
 * Wraps the entire app to provide buttery-smooth inertial scrolling.
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Store globally so framer-motion useScroll works properly
    window.__lenis = lenis;

    // RAF loop — integrates with framer-motion scroll tracking
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor click handling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href')?.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -20, duration: 1.4 });
      }
    };

    // Patch scrollIntoView for CommandPalette etc.
    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function () {
      lenis.scrollTo(this, { offset: -20, duration: 1.4 });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      Element.prototype.scrollIntoView = origScrollIntoView;
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return children;
};

export default SmoothScroll;
