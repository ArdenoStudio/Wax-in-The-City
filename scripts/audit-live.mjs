import https from 'https';
import dns from 'dns';
import tls from 'tls';

const DOMAIN = 'wax-in-the-city.netlify.app';
const BASE_URL = `https://${DOMAIN}`;

const routes = [
  '/',
  '/services',
  '/services/body-waxing',
  '/services/facial-waxing',
  '/services/intimate-waxing',
  '/book',
  '/booking',
  '/about',
  '/contact',
  '/pricing',
  '/wax-types',
  '/gallery',
  '/faq',
  '/locations',
  '/locations/waterloo',
  '/locations/covent-garden',
  '/admin',
  '/robots.txt',
  '/sitemap.xml',
  '/site.webmanifest',
  '/favicon.ico',
  '/non-existent-probe-404'
];

async function checkDns() {
  return new Promise((resolve) => {
    dns.resolve4(DOMAIN, (err, addresses) => {
      resolve({ addresses: addresses || [], error: err?.message });
    });
  });
}

async function checkSsl() {
  return new Promise((resolve) => {
    const socket = tls.connect(443, DOMAIN, { servername: DOMAIN }, () => {
      const cert = socket.getPeerCertificate();
      const cipher = socket.getCipher();
      const protocol = socket.getProtocol();
      const authorized = socket.authorized;
      socket.end();
      resolve({
        authorized,
        valid_from: cert.valid_from,
        valid_to: cert.valid_to,
        issuer: cert.issuer,
        subject: cert.subject,
        cipher,
        protocol
      });
    });
    socket.on('error', (err) => resolve({ error: err.message }));
  });
}

async function fetchRoute(path) {
  return new Promise((resolve) => {
    const start = performance.now();
    const req = https.request({
      hostname: DOMAIN,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 NetlifyAuditor/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const duration = Math.round(performance.now() - start);
        const buffer = Buffer.concat(chunks);
        resolve({
          path,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          duration,
          headers: res.headers,
          bodyLength: buffer.length,
          bodySample: buffer.toString('utf8').slice(0, 3000)
        });
      });
    });
    req.on('error', (err) => resolve({ path, error: err.message }));
    req.end();
  });
}

async function main() {
  console.log('===============================================================');
  console.log(` AUDITING NETLIFY LIVE DEPLOYMENT: ${BASE_URL}`);
  console.log('===============================================================');

  // DNS & SSL
  const dnsRes = await checkDns();
  console.log('\n--- 1. DNS RESOLUTION ---');
  console.log('IP Addresses:', dnsRes.addresses);

  const sslRes = await checkSsl();
  console.log('\n--- 2. SSL/TLS CERTIFICATE ---');
  console.log('Authorized:', sslRes.authorized);
  console.log('Protocol:', sslRes.protocol);
  console.log('Cipher:', sslRes.cipher?.name);
  console.log('Valid From:', sslRes.valid_from);
  console.log('Valid To:', sslRes.valid_to);
  console.log('Issuer:', sslRes.issuer);

  // Root Headers inspection
  console.log('\n--- 3. ROOT RESPONSE HEADERS (/) ---');
  const root = await fetchRoute('/');
  console.log(`Status: ${root.statusCode} ${root.statusMessage} (${root.duration}ms)`);
  console.log('Headers:', JSON.stringify(root.headers, null, 2));

  // Security Headers Analysis
  console.log('\n--- 4. SECURITY HEADERS CHECKLIST ---');
  const secHeaders = {
    'Strict-Transport-Security (HSTS)': root.headers['strict-transport-security'],
    'Content-Security-Policy (CSP)': root.headers['content-security-policy'],
    'X-Frame-Options': root.headers['x-frame-options'],
    'X-Content-Type-Options': root.headers['x-content-type-options'],
    'Referrer-Policy': root.headers['referrer-policy'],
    'Permissions-Policy': root.headers['permissions-policy'],
    'X-DNS-Prefetch-Control': root.headers['x-dns-prefetch-control'],
    'Server': root.headers['server'],
    'X-Powered-By': root.headers['x-powered-by'],
    'X-Robots-Tag': root.headers['x-robots-tag'],
    'Cache-Control': root.headers['cache-control'],
    'Age / Netlify Caching': {
      'age': root.headers['age'],
      'etag': root.headers['etag'],
      'x-nf-request-id': root.headers['x-nf-request-id'],
      'netlify-vary': root.headers['netlify-vary']
    }
  };
  console.log(JSON.stringify(secHeaders, null, 2));

  // Route Scanning
  console.log('\n--- 5. COMPREHENSIVE ROUTE AUDIT ---');
  for (const route of routes) {
    const res = await fetchRoute(route);
    if (res.error) {
      console.log(`[FAIL] ${route.padEnd(30)} -> Error: ${res.error}`);
    } else {
      console.log(`[${res.statusCode}] ${route.padEnd(30)} | ${res.duration}ms | bytes: ${res.bodyLength} | C-Type: ${res.headers['content-type'] || 'none'} | Cache: ${res.headers['cache-control'] || 'none'}`);
      if (res.statusCode >= 300 && res.statusCode < 400) {
        console.log(`       -> Redirects to: ${res.headers['location']}`);
      }
    }
  }

  // SEO & Head tag extraction on Root, Services, About, Locations
  console.log('\n--- 6. SEO & META TAGS EXTRACTION (Root /) ---');
  const titleMatch = root.bodySample.match(/<title>([^<]*)<\/title>/i);
  const metaDescMatch = root.bodySample.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const ogTitleMatch = root.bodySample.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const ogDescMatch = root.bodySample.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  const ogImageMatch = root.bodySample.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  const canonicalMatch = root.bodySample.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const viewportMatch = root.bodySample.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']/i);
  
  console.log('Title:', titleMatch ? titleMatch[1] : 'MISSING');
  console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'MISSING');
  console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'MISSING');
  console.log('OG Description:', ogDescMatch ? ogDescMatch[1] : 'MISSING');
  console.log('OG Image:', ogImageMatch ? ogImageMatch[1] : 'MISSING');
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'MISSING');
  console.log('Viewport:', viewportMatch ? viewportMatch[1] : 'MISSING');

  // Check robots.txt and sitemap.xml contents
  console.log('\n--- 7. ROBOTS.TXT & SITEMAP.XML CONTENT ---');
  const robots = await fetchRoute('/robots.txt');
  console.log('Robots.txt status:', robots.statusCode);
  console.log('Robots.txt content:\n', robots.bodySample);

  const sitemap = await fetchRoute('/sitemap.xml');
  console.log('Sitemap.xml status:', sitemap.statusCode);
  console.log('Sitemap.xml content (first 500 chars):\n', sitemap.bodySample.slice(0, 500));
}

main().catch(console.error);
