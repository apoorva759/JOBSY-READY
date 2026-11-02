import app from './server.js';

/**
 * Build a Vercel function that forwards one concrete API path to the shared
 * Express application. Explicit route files avoid relying on a catch-all
 * function being discovered for nested API paths.
 */
export const createVercelApiHandler = (route: string) => {
  return (req: any, res: any) => {
    const queryIndex = typeof req.url === 'string' ? req.url.indexOf('?') : -1;
    const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
    req.url = `${route}${query}`;
    return app(req, res);
  };
};
