"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestResolver = void 0;
const date_fns_1 = require("date-fns");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Contest_1 = require("../entities/Contest");
const Problem_1 = require("../entities/Problem");
const isAuth_1 = require("../middlewares/isAuth");
const ContestArgs_1 = require("../types/graphql/ContestArgs");
const PaginationArgs_1 = require("../types/graphql/PaginationArgs");
const ProblemArgs_1 = require("../types/graphql/ProblemArgs");
let ContestResolver = class ContestResolver {
    createContest(args, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.start) {
                if (!date_fns_1.isValid(new Date(args.start))) {
                    throw new Error("Invalid start timestamp");
                }
            }
            if (args.end) {
                if (!date_fns_1.isValid(new Date(args.end))) {
                    throw new Error("Invalid end timestamp");
                }
            }
            return Contest_1.Contest.create(Object.assign(Object.assign({}, args), { creatorId: req.userId })).save();
        });
    }
    findContests({ limit, cursor }) {
        return __awaiter(this, void 0, void 0, function* () {
            limit = Math.min(50, limit);
            const replacements = [limit + 1];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const contests = yield typeorm_1.getConnection().query(`
      SELECT c.*
      FROM contest c
      ${cursor ? `WHERE c."createdAt" < $2` : ""}
      ORDER BY c."createdAt" DESC
      LIMIT $1
    `, replacements);
            return {
                contests: contests.slice(0, limit),
                hasMore: contests.length === limit + 1,
            };
        });
    }
    getContest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contest = yield typeorm_1.createQueryBuilder("contest", "c")
                .innerJoinAndSelect("c.creator", "user")
                .where("c.id = :id", { id })
                .getOne();
            contest.isCreator = true;
            return contest;
        });
    }
    createProblem(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            return Problem_1.Problem.create(args).save();
        });
    }
    updateProblem(id, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Problem_1.Problem)
                .set(args)
                .where("id = :id", { id })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    findProblems(contestId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getConnection().query(`
      SELECT * FROM problem p
      WHERE p."contestId" = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
      ORDER BY p.rank;
    `, [contestId, req.userId]);
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Contest_1.Contest),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("args", () => ContestArgs_1.ContestArgs)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ContestArgs_1.ContestArgs, Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "createContest", null);
__decorate([
    type_graphql_1.Query(() => ContestArgs_1.PaginatedContest),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("args", () => PaginationArgs_1.PaginationArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationArgs_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "findContests", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => Contest_1.Contest),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "getContest", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Problem_1.Problem),
    __param(0, type_graphql_1.Arg("args", () => ProblemArgs_1.ProblemArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProblemArgs_1.ProblemArgs]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "createProblem", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Problem_1.Problem),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("args", () => ProblemArgs_1.ProblemUpdateArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ProblemArgs_1.ProblemUpdateArgs]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "updateProblem", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Problem_1.Problem]),
    __param(0, type_graphql_1.Arg("contestId")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "findProblems", null);
ContestResolver = __decorate([
    type_graphql_1.Resolver(Contest_1.Contest)
], ContestResolver);
exports.ContestResolver = ContestResolver;
//# sourceMappingURL=ContestResolver.js.map