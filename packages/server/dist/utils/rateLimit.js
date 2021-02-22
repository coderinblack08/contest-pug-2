"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rateLimitMiddleware = (rateLimiter, message = "Too many requests, slow down", showTime = false) => (req, res, next) => {
    rateLimiter
        .consume(req.userId)
        .then(() => {
        next();
    })
        .catch(({ msBeforeNext }) => {
        let alert = message;
        if (showTime) {
            let minutes = Math.floor(msBeforeNext / 1000 / 60);
            let hours = 0;
            if (minutes > 60) {
                hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
            }
            const parts = [];
            if (hours) {
                parts.push(`${hours} hours`);
            }
            if (minutes) {
                parts.push(`${minutes} mins`);
            }
            alert += `resets in ${parts.join(" and ")}`;
        }
        res.status(429).send(alert);
    });
};
exports.rateLimitMiddleware = rateLimitMiddleware;
//# sourceMappingURL=rateLimit.js.map