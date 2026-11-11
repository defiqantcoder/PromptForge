import { Request, Response, NextFunction } from 'express';

// 1. Security Headers
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
}

// 2. Rate Limiter
interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  skip?: (req: Request) => boolean;
}

export function createRateLimiter(options: RateLimiterOptions = {}) {
  const windowMs = options.windowMs || 60000;
  const maxRequests = options.maxRequests || 1000; // default generous for dev
  const skip = options.skip || (() => false);

  const ipRequests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    if (skip(req)) {
      return next();
    }

    // Attempt to get IP in a standard way
    let ip = req.ip || req.connection?.remoteAddress || 'unknown';
    // Remove IPv6 prefix for localhost if present
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    }

    const now = Date.now();
    const record = ipRequests.get(ip);

    if (!record) {
      ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (now > record.resetTime) {
      ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      res.status(429).json({ error: "Too many AI requests. Please wait a moment and try again." });
      return;
    }

    record.count++;
    next();
  };
}

// 3. Local Origin Guard
export function localOriginGuard(req: Request, res: Response, next: NextFunction) {
  // Only applies to POST requests
  if (req.method !== 'POST') {
    return next();
  }

  // Only run in production mode
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const origin = req.headers.origin;

  // Allow if no origin is provided (server tests / curl)
  if (!origin) {
    return next();
  }

  // Check if it's local
  const isLocal = origin.startsWith('http://localhost') ||
                  origin.startsWith('http://127.0.0.1') ||
                  origin === 'null' || // Some local dev schemes
                  origin.startsWith('tauri://'); // Tauri

  if (!isLocal) {
    res.status(403).json({ error: "Cross-origin requests are not allowed." });
    return;
  }

  next();
}
