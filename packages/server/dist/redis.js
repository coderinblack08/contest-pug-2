"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRateLimitOptions = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    enableOfflineQueue: false,
});
exports.defaultRateLimitOptions = {
    storeClient: exports.redis,
    execEvenly: false,
    blockDuration: 60 * 60 * 12,
};
//# sourceMappingURL=redis.js.map