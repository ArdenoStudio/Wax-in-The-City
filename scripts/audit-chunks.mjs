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

async function getLiveHtml(path) {
  return new Promise((resolve) => {
    https.get(`https://${DOMAIN}${path}`, {
      headers: { 'Accept-Encoding': 'gzip, deflate, br' }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const decomp = decompress(buf, res.headers['content-encoding']);
        resolve({ headers: res.headers, html: decomp.toString('utf8') });
      });
    });
  });
}

async function headRequest(path) {
  return new Promise((resolve) => {
    https.request({
      hostname: DOMAIN,
      port: 443,
      path,
      method: 'HEAD'
    }, (res) => {
      resolve({ path, statusCode: res.statusCode, headers: res.headers });
    }).end();
  });
}

async function main() {
  const { html } = await getLiveHtml('/');
  // Find scripts and css
  const scriptSrcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  const linkCss = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)].map(m => m[1]);

  console.log('Found scripts:', scriptSrcs);
  console.log('Found stylesheets:', linkCss);

  for (const src of [...scriptSrcs.slice(0, 3), ...linkCss.slice(0, 2)]) {
    const res = await headRequest(src);
    console.log(`[${res.statusCode}] ${src} -> Cache: ${res.headers['cache-control']}`);
  }
}

main().catch(console.error);
