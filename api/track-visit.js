const BOT_PATTERNS = /bot|crawl|spider|slurp|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview|fetch|curl|wget|python|java|go-http|axios|node-fetch|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot/i;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userAgent = req.headers['user-agent'] || 'Unknown';

  // Filter out bots
  if (BOT_PATTERNS.test(userAgent)) {
    return res.status(200).json({ skipped: true });
  }

  // Collect visitor info from Vercel's headers (free geo-IP data)
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'Unknown';
  const country = req.headers['x-vercel-ip-country'] || 'Unknown';
  const city = decodeURIComponent(req.headers['x-vercel-ip-city'] || 'Unknown');
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const body = req.body || {};
  const { type } = body;

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // ─── DURATION EVENT: visitor left the page ───
  if (type === 'duration') {
    const { duration, page, visitCount } = body;
    const durationStr = formatDuration(duration);

    const durationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 420px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden; border: 1px solid #30363d;">
        <div style="background: linear-gradient(135deg, #8957e5 0%, #1f6feb 100%); padding: 16px 24px;">
          <h2 style="margin: 0; color: #fff; font-size: 16px;">⏱ Visitor Left — ${durationStr}</h2>
          <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">${timestamp}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 24px; color: #8b949e; width: 100px;">Duration</td>
            <td style="padding: 10px 24px; color: #58a6ff; font-weight: 600; font-size: 16px;">${durationStr}</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 24px; color: #8b949e;">Page</td>
            <td style="padding: 10px 24px; color: #e6edf3;">${page || '/'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 24px; color: #8b949e;">IP</td>
            <td style="padding: 10px 24px; color: #e6edf3; font-family: monospace;">${ip}</td>
          </tr>
          <tr>
            <td style="padding: 10px 24px; color: #8b949e;">Visit #</td>
            <td style="padding: 10px 24px; color: #e6edf3;">${visitCount || '?'}</td>
          </tr>
        </table>
      </div>
    `;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Tracker <onboarding@resend.dev>',
          to: 'arnav.07.sagar@gmail.com',
          subject: `⏱ Visitor stayed ${durationStr} (visit #${visitCount || '?'})`,
          html: durationHtml,
        }),
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Duration email error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // ─── VISIT EVENT: new visitor arrived ───
  const {
    referrer, page, screenSize,
    language, timezone, platform,
    deviceMemory, cpuCores, connectionType,
    touchDevice, colorDepth, windowSize, utm,
    visitCount, firstVisit, lastVisit,
  } = body;

  // Parse user agent for a readable device/browser summary
  const device = parseDevice(userAgent);

  // Enrich with IP geolocation via ipapi.co (free: 1,000 req/day)
  let isp = '';
  let geo = '';
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      isp = geoData.org || '';
      // Use ipapi geo as fallback if Vercel headers are missing
      if (city === 'Unknown' && geoData.city) {
        geo = `${geoData.city}, ${geoData.region}, ${geoData.country_name}`;
      }
    }
  } catch {
    // proceed without ISP data
  }

  const locationStr = geo || `${city}${region ? ', ' + region : ''}, ${country}`;

  // Repeat visitor badge
  const isReturning = visitCount && visitCount > 1;
  const returningBadge = isReturning
    ? `<span style="display: inline-block; background: #da3633; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 8px;">🔁 Returning × ${visitCount}</span>`
    : `<span style="display: inline-block; background: #238636; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 8px;">✨ New</span>`;

  // Format last visit time
  const lastVisitStr = lastVisit
    ? new Date(lastVisit).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : null;
  const firstVisitStr = firstVisit
    ? new Date(firstVisit).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : null;

  // Format UTM info
  const utmStr = utm
    ? [utm.source && `source: ${utm.source}`, utm.medium && `medium: ${utm.medium}`, utm.campaign && `campaign: ${utm.campaign}`].filter(Boolean).join(' · ')
    : null;

  // Helper to create a table row
  const row = (label, value, highlight = false, isLast = false) => value ? `
        <tr${!isLast ? ' style="border-bottom: 1px solid #21262d;"' : ''}>
          <td style="padding: 12px 24px; color: #8b949e; width: 120px;">${label}</td>
          <td style="padding: 12px 24px; color: ${highlight ? '#f0883e' : '#e6edf3'};${label === 'IP Address' ? ' font-family: monospace;' : ''}${highlight ? ' font-weight: 600;' : ''}">${value}</td>
        </tr>` : '';

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden; border: 1px solid #30363d;">
      <div style="background: linear-gradient(135deg, ${isReturning ? '#da3633' : '#238636'} 0%, #1f6feb 100%); padding: 20px 24px;">
        <h2 style="margin: 0; color: #fff; font-size: 18px;">${isReturning ? '🔁 Returning' : '✨ New'} Visitor on arnavsagar.dev ${returningBadge}</h2>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">${timestamp}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row('Visit #', visitCount ? `${visitCount}${visitCount > 3 ? ' 👀 Stalker alert!' : ''}` : null, isReturning)}
        ${row('First Seen', firstVisitStr)}
        ${row('Last Visit', lastVisitStr)}
        ${row('Location', locationStr)}
        ${row('IP Address', ip)}
        ${row('ISP / Org', isp)}
        ${row('Device', device)}
        ${row('Screen', screenSize)}
        ${row('Viewport', windowSize)}
        ${row('Platform', platform)}
        ${row('Language', language)}
        ${row('Timezone', timezone)}
        ${row('Connection', connectionType)}
        ${row('CPU Cores', cpuCores)}
        ${row('RAM', deviceMemory ? `${deviceMemory} GB` : null)}
        ${row('Color Depth', colorDepth ? `${colorDepth}-bit` : null)}
        ${row('Touch', touchDevice ? 'Yes' : 'No')}
        ${row('Referrer', referrer || 'Direct')}
        ${row('Page', page || '/')}
        ${row('UTM', utmStr, false, true)}
      </table>
    </div>
  `;

  const subjectPrefix = isReturning ? `🔁 Returning visitor (×${visitCount})` : '👤 New visitor';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Tracker <onboarding@resend.dev>',
        to: 'arnav.07.sagar@gmail.com',
        subject: `${subjectPrefix} from ${locationStr}${isp ? ` (${isp})` : ''}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Track-visit error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function parseDevice(ua) {
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';

  if (/iphone/i.test(ua)) os = 'iPhone';
  else if (/ipad/i.test(ua)) os = 'iPad';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/mac/i.test(ua)) os = 'macOS';
  else if (/win/i.test(ua)) os = 'Windows';
  else if (/linux/i.test(ua)) os = 'Linux';

  return `${browser} on ${os}`;
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return `${mins}m ${secs}s`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}
