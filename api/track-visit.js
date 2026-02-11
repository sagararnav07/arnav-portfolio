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
  const { referrer, page, screenSize } = req.body || {};

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // Parse user agent for a readable device/browser summary
  const device = parseDevice(userAgent);

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden; border: 1px solid #30363d;">
      <div style="background: linear-gradient(135deg, #238636 0%, #1f6feb 100%); padding: 20px 24px;">
        <h2 style="margin: 0; color: #fff; font-size: 18px;">New Visitor on arnavsagar.dev</h2>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">${timestamp}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px 24px; color: #8b949e; width: 110px;">Location</td>
          <td style="padding: 12px 24px; color: #e6edf3; font-weight: 500;">${city}${region ? ', ' + region : ''}, ${country}</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px 24px; color: #8b949e;">IP Address</td>
          <td style="padding: 12px 24px; color: #e6edf3; font-family: monospace;">${ip}</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px 24px; color: #8b949e;">Device</td>
          <td style="padding: 12px 24px; color: #e6edf3;">${device}</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px 24px; color: #8b949e;">Screen</td>
          <td style="padding: 12px 24px; color: #e6edf3;">${screenSize || 'Unknown'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px 24px; color: #8b949e;">Referrer</td>
          <td style="padding: 12px 24px; color: #e6edf3;">${referrer || 'Direct'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 24px; color: #8b949e;">Page</td>
          <td style="padding: 12px 24px; color: #e6edf3;">${page || '/'}</td>
        </tr>
      </table>
    </div>
  `;

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
        subject: `👤 Visitor from ${city}, ${country}`,
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
