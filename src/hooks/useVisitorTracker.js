import { useEffect } from 'react';

/**
 * Silently notifies you via email when someone visits arnavsagar.dev.
 * Fires once per browser session to avoid spamming your inbox.
 * Also sends enriched device/browser metadata for better visitor insights.
 * Tracks visit duration (sent on page close) and repeat visitor count.
 */
const useVisitorTracker = () => {
  useEffect(() => {
    // Only fire once per session
    if (sessionStorage.getItem('_vt')) return;

    // Record the session start time for duration tracking
    const startTime = Date.now();

    // --- Repeat visitor detection via localStorage ---
    let visitCount = 1;
    let firstVisit = null;
    let lastVisit = null;
    try {
      const stored = JSON.parse(localStorage.getItem('_vtData') || '{}');
      visitCount = (stored.visitCount || 0) + 1;
      firstVisit = stored.firstVisit || new Date().toISOString();
      lastVisit = stored.lastVisit || null;
      localStorage.setItem('_vtData', JSON.stringify({
        visitCount,
        firstVisit,
        lastVisit: new Date().toISOString(),
      }));
    } catch {
      // localStorage unavailable (incognito etc.) — proceed without
    }

    // Wait 2 seconds — filters out quick bounces & prefetch bots
    const timer = setTimeout(async () => {
      try {
        sessionStorage.setItem('_vt', '1');

        // Parse UTM parameters if present
        const params = new URLSearchParams(window.location.search);
        const utm = {
          source: params.get('utm_source'),
          medium: params.get('utm_medium'),
          campaign: params.get('utm_campaign'),
        };

        await fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'visit',
            referrer: document.referrer || null,
            page: window.location.pathname,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            // Enriched visitor metadata
            userAgent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            deviceMemory: navigator.deviceMemory || null,
            cpuCores: navigator.hardwareConcurrency || null,
            connectionType: navigator.connection?.effectiveType || null,
            touchDevice: navigator.maxTouchPoints > 0,
            colorDepth: window.screen.colorDepth,
            windowSize: `${window.innerWidth}x${window.innerHeight}`,
            utm: Object.values(utm).some(Boolean) ? utm : null,
            // Repeat visitor data
            visitCount,
            firstVisit,
            lastVisit,
          }),
        });

        // Send custom event to Google Analytics
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'visitor_tracked', {
            visitor_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            visitor_language: navigator.language,
            visitor_referrer: document.referrer || 'direct',
            visitor_touch: navigator.maxTouchPoints > 0,
            visit_count: visitCount,
            returning_visitor: visitCount > 1,
          });
        }
      } catch {
        // Fail silently — visitor tracking should never break the site
      }
    }, 2000);

    // --- Duration tracking: send on page close ---
    const sendDuration = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      // Only send if they stayed more than 3 seconds (filter out bounces)
      if (duration < 3) return;
      const payload = JSON.stringify({
        type: 'duration',
        duration,
        page: window.location.pathname,
        visitCount,
      });
      // sendBeacon is reliable on page close — doesn't block unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-visit', new Blob([payload], { type: 'application/json' }));
      }
      // Also send to GA
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'visit_duration', {
          duration_seconds: duration,
          duration_label: formatDuration(duration),
        });
      }
    };

    // Use both visibilitychange and beforeunload for maximum coverage
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendDuration();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', sendDuration);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendDuration);
    };
  }, []);
};

/** Format seconds into a human-readable duration */
function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return `${mins}m ${secs}s`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

export default useVisitorTracker;
