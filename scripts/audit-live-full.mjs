import https from 'https';
import zlib from 'zlib';

const DOMAIN = 'wax-in-the-city.netlify.app';

function decompress(buffer, encoding) {
  if (!encoding) return buffer;
  if (encoding.includes('br')) return zlib.brotliDecompressSync(buffer);
  if (encoding.includes('gzip')) return zlib.gunzipSync(buffer);
  if (encoding.includes('deflate')) return zlib.inflateSync(buffer);
  return buffer;
}

export async function fetchLive(path, options = {}) {
  return new Promise((resolve) => {
    const start = performance.now();
    const req = https.request({
      hostname: DOMAIN,
      port: 443,
      path: path,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 NetlifyAuditor/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        ...(options.headers || {})
      }
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const duration = Math.round(performance.now() - start);
        const rawBuffer = Buffer.concat(chunks);
        let decompressedBuffer = rawBuffer;
        try {
          decompressedBuffer = decompress(rawBuffer, res.headers['content-encoding']);
        } catch (e) {
          // fallback
        }
        const text = decompressedBuffer.toString('utf8');
        resolve({
          path,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          duration,
          headers: res.headers,
          rawLength: rawBuffer.length,
          decompressedLength: decompressedBuffer.length,
          text
        });
      });
    });
    req.on('error', (err) => resolve({ path, error: err.message }));
    req.end();
  });
}

async function run() {
  const routesToTest = [
    // Core routes
    '/',
    '/services',
    '/services/waxing',
    '/services/facials',
    '/services/moroccan',
    '/services/hydra-facial',
    '/book',
    '/about',
    '/contact',
    '/gallery',
    '/faq',
    '/locations',
    '/locations/battaramulla',
    '/locations/nugegoda',
    '/admin',
    // Aliases / potential missing redirects
    '/booking',
    '/pricing',
    '/wax-types',
    '/treatments',
    '/services/body-waxing',
    '/locations/waterloo',
    // SEO & Technical assets
    '/robots.txt',
    '/sitemap.xml',
    '/site.webmanifest',
    '/favicon.ico',
    // 404 test
    '/non-existent-probe-404'
  ];

  console.log('=== ROUTE AUDIT RESULTS ===');
  const results = {};
  for (const r of routesToTest) {
    const res = await fetchLive(r);
    results[r] = res;
    console.log(`[${res.statusCode}] ${r.padEnd(28)} | ${res.duration}ms | raw: ${res.rawLength}B | uncompressed: ${res.decompressedLength}B | Type: ${res.headers['content-type']}`);
  }

  console.log('\n=== ROBOTS.TXT CONTENT ===');
  console.log(results['/robots.txt']?.text);

  console.log('\n=== SITEMAP.XML CONTENT ===');
  console.log(results['/sitemap.xml']?.text);

  console.log('\n=== HEAD & SEO TAGS ANALYSIS ON KEY ROUTES ===');
  const keyRoutes = ['/', '/services', '/services/waxing', '/book', '/about', '/contact', '/locations/battaramulla'];
  
  for (const r of keyRoutes) {
    const page = results[r];
    if (!page || !page.text) continue;
    const html = page.text;
    
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || 'MISSING';
    const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const ogUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const twitterCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i)?.[1] || 'MISSING';
    const jsonLd = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]*)<\/script>/gi)].map(m => m[1]);

    console.log(`\n--- Route: ${r} ---`);
    console.log(`Title: ${title}`);
    console.log(`Meta Description: ${metaDesc}`);
    console.log(`Canonical URL: ${canonical}`);
    console.log(`OG Title: ${ogTitle}`);
    console.log(`OG Description: ${ogDesc}`);
    console.log(`OG Image: ${ogImage}`);
    console.log(`OG URL: ${ogUrl}`);
    console.log(`Twitter Card: ${twitterCard}`);
    console.log(`JSON-LD Schemas found: ${jsonLd.length}`);
    if (jsonLd.length > 0) {
      jsonLd.forEach((schema, idx) => {
        try {
          const parsed = JSON.parse(schema);
          console.log(`  Schema [${idx + 1}] @type:`, parsed['@type'] || parsed['@graph']);
        } catch (e) {
          console.log(`  Schema [${idx + 1}] (raw text preview):`, schema.slice(0, 100));
        }
      });
    }
  }
}

run().catch(console.error);
