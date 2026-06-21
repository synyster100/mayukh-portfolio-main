import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers || {})) {
      if (Array.isArray(v)) v.forEach((vv) => headers.append(k, String(v)));
      else if (v != null) headers.set(k, String(v));
    }

    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // Node's IncomingMessage is a readable stream — pass it directly as body
      body = req;
    }

    const request = new Request(url.toString(), { method: req.method, headers, body });

    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
