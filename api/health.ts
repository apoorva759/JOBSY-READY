export default function handler(_req: unknown, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    status: 'ok',
    backend: 'vercel-function',
    hasKey: Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY),
    time: new Date().toISOString()
  });
}
