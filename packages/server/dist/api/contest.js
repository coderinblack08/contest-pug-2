"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@contest-pug/common");
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const typeorm_1 = require("typeorm");
const redis_1 = require("../redis");
const Contest_1 = require("../entities/Contest");
const isAuth_1 = require("../utils/isAuth");
const rateLimitMiddleware_1 = require("../utils/rateLimitMiddleware");
const router = express_1.default.Router();
router.post("/create", isAuth_1.isAuth(), rateLimitMiddleware_1.rateLimitMiddleware(new rate_limiter_flexible_1.RateLimiterRedis(Object.assign(Object.assign({}, redis_1.defaultRateLimitOptions), { points: 10, duration: 60 * 60 * 12, keyPrefix: "rl/contests/create/" }))), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield common_1.contestSchema.validate(req.body);
    }
    catch (err) {
        return next(http_errors_1.default(400, err.errors));
    }
    try {
        const contest = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Contest_1.Contest)
            .values([Object.assign(Object.assign({}, req.body), { creatorId: req.userId })])
            .returning("*")
            .execute();
        res.json(contest.raw[0]);
    }
    catch (error) {
        if (error.message.includes("duplicate key")) {
            return next(http_errors_1.default(400, "duplicate name"));
        }
        else {
            console.error(error);
        }
    }
}));
router.get("/", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contests = yield typeorm_1.getConnection().query(`
    SELECT c.* FROM contest c INNER JOIN member m ON (m."contestId" = c.id)
    union
    SELECT c.* FROM contest c WHERE c."creatorId" = $1
    `, [req.userId]);
    console.log(contests);
    res.json(contests);
}));
exports.default = router;
//# sourceMappingURL=contest.js.map