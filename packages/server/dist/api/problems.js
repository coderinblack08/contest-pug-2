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
const Contest_1 = require("../entities/Contest");
const Problem_1 = require("../entities/Problem");
const redis_1 = require("../redis");
const isAuth_1 = require("../utils/isAuth");
const rateLimitMiddleware_1 = require("../utils/rateLimitMiddleware");
const router = express_1.default.Router();
router.post("/create", isAuth_1.isAuth(), rateLimitMiddleware_1.rateLimitMiddleware(new rate_limiter_flexible_1.RateLimiterRedis(Object.assign(Object.assign({}, redis_1.defaultRateLimitOptions), { points: 500, duration: 60 * 60 * 12, keyPrefix: "rl/problems/create/" }))), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield common_1.problemSchema.validate(req.body);
    }
    catch (err) {
        return next(http_errors_1.default(400, err.errors));
    }
    try {
        const contest = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Problem_1.Problem)
            .values([req.body])
            .returning("*")
            .execute();
        res.json(contest.raw[0]);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get("/:id", isAuth_1.isAuth(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield typeorm_1.getConnection().query(`
      SELECT * FROM problem p
      WHERE p."contestId" = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
      ORDER BY p.rank
    `, [req.params.id, req.userId]);
        res.json(problems);
    }
    catch (error) {
        console.error(error);
        next(http_errors_1.default(400, error));
    }
}));
router.put("/update", isAuth_1.isAuth(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isOwner = yield Contest_1.Contest.findOne({
            id: req.body.contestId,
            creatorId: req.userId,
        });
        if (isOwner) {
            yield Problem_1.Problem.update({ id: req.body.id }, req.body);
            res.send(true);
        }
        else {
            next(http_errors_1.default(401, "not authorized"));
        }
    }
    catch (error) {
        console.error(error);
        next(http_errors_1.default(400, error));
    }
}));
router.delete("/:id", isAuth_1.isAuth(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.getConnection().query(`
      DELETE FROM problem p
      WHERE p.id = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
    `, [req.params.id, req.userId]);
        res.send(true);
    }
    catch (error) {
        console.error(error);
        next(http_errors_1.default(400, error));
    }
}));
exports.default = router;
//# sourceMappingURL=problems.js.map