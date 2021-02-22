"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rateLimitMiddleware = (rateLimiter) => (req, res, next) => {
    rateLimiter
        .consume(req.userId)
        .then(() => {
        next();
    })
        .catch((_) => {
        res.status(429).send("Too Many Requests");
    });
};
exports.rateLimitMiddleware = rateLimitMiddleware;
//# sourceMappingURL=rateLimitMiddleware.js.map