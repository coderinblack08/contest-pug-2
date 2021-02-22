import { NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";

export const rateLimitMiddleware = (rateLimiter: RateLimiterRedis) => (
  req: any,
  res: any,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.userId)
    .then(() => {
      next();
    })
    .catch((_) => {
      res.status(429).send("Too Many Requests");
    });
};
