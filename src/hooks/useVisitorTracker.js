import { useEffect } from 'react';

/**
 * Silently notifies you via email when someone visits arnavsagar.dev.
 * Fires once per browser session to avoid spamming your inbox.
 */
const useVisitorTracker = () => {
  useEffect(() => {
    // Only fire once per session
    if (sessionStorage.getItem('_vt')) return;

    // Wait 2 seconds — filters out quick bounces & prefetch bots
    const timer = setTimeout(async () => {
      try {
        sessionStorage.setItem('_vt', '1');

        await fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrer: document.referrer || null,
            page: window.location.pathname,
            screenSize: `${window.screen.width}x${window.screen.height}`,
          }),
        });
      } catch {
        // Fail silently — visitor tracking should never break the site
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
};

export default useVisitorTracker;
