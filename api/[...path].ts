import app from '../server.ts';

// Vercel may pass only the catch-all suffix to the function. Normalize it
// so the existing Express routes continue to match their /api/... paths.
export default function handler(req: any, res: any) {
  const requestUrl = req.url || '/';
  if (requestUrl !== '/api' && !requestUrl.startsWith('/api/')) {
    req.url = `/api${requestUrl.startsWith('/') ? requestUrl : `/${requestUrl}`}`;
  }
  return app(req, res);
}
