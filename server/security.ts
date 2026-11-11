import { NextFunction, Request, Response } from 'express';

/**
 * Sets defensive security headers on API responses.
 */
export function securityHeadersMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
}

/**
 * Configuration options for the in-memory per-IP rate limiter.
 */
interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  skip?: (req: Request) => boolean;
}

/**
 * Creates a fixed-window per-IP rate limiting middleware returning 429 JSON on excess bursts.
 */
export function createRateLimiter(options: RateLimiterOptions = {}) {
  const windowMs = options.windowMs ?? 60000;
  const maxRequests = options.maxRequests ?? 1000;
  const skip = options.skip ?? (() => false);

  const ipRequests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    if (skip(req)) {
      return next();
    }

    let ip = req.ip || req.socket?.remoteAddress || 'unknown';
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    }

    const now = Date.now();
    if (ipRequests.size > 10000) {
      for (const [key, entry] of ipRequests.entries()) {
        if (now > entry.resetTime) {
          ipRequests.delete(key);
        }
      }
    }

    const record = ipRequests.get(ip);
    if (!record || now > record.resetTime) {
      ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        error: 'Too many AI requests. Please wait a moment and try again.',
      });
      return;
    }

    record.count++;
    next();
  };
}

/**
 * Validates that state-mutating production POST requests originate from localhost, 127.0.0.1, Tauri, or no-Origin clients.
 */
export function localOriginGuard(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'POST') {
    return next();
  }

  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const origin = req.headers.origin;
  if (!origin) {
    return next();
  }

  let isLocal = origin === 'null';
  if (!isLocal) {
    try {
      const url = new URL(origin);
      const isLoopbackHost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
      isLocal =
        (url.protocol === 'http:' && isLoopbackHost && !url.username && !url.password) ||
        url.protocol === 'tauri:';
    } catch {
      isLocal = false;
    }
  }

  if (!isLocal) {
    res.status(403).json({ error: 'Cross-origin requests are not allowed.' });
    return;
  }

  next();
}
