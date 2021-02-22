import Redis from "ioredis";
import { IRateLimiterStoreOptions } from "rate-limiter-flexible";

export const redis = new Redis({
  enableOfflineQueue: false,
});

export const defaultRateLimitOptions: IRateLimiterStoreOptions = {
  storeClient: redis,
  execEvenly: false,
  blockDuration: 60 * 60 * 12,
};
