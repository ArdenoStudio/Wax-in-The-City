import https from 'https';

const DOMAIN = 'wax-in-the-city-website.vercel.app';

async function headRequest(path) {
  return new Promise((resolve) => {
    const start = performance.now();
    const req = https.request({
      hostname: DOMAIN,
      port: 443,
      path,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 NetlifyAuditor/1.0',
        'Accept': 'image/avif,image/webp,image/*,*/*'
      }
    }, (res) => {
      const duration = Math.round(performance.now() - start);
      resolve({
        path,
        statusCode: res.statusCode,
        duration,
        headers: res.headers
      });
    });
    req.on('error', (err) => resolve({ path, error: err.message }));
    req.end();
  });
}

async function main() {
  const assets = [
    '/favicon.ico',
    '/site.webmanifest',
    '/images/witc-wordmark-square.jpg',
    '/images/og-image.jpg',
    '/_next/image?url=%2Fimages%2Fog-image.jpg&w=1200&q=75',
    '/_next/static/css/app/layout.css' // check if next static routes respond
  ];

  console.log('=== STATIC ASSET & CDN CACHING AUDIT ===');
  for (const a of assets) {
    const res = await headRequest(a);
    console.log(`[${res.statusCode}] ${a.padEnd(60)} | Cache: ${res.headers?.['cache-control'] || 'none'} | Type: ${res.headers?.['content-type'] || 'none'}`);
  }
}

main().catch(console.error);
