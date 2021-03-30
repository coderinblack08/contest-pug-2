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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedContest = exports.ContestArgs = void 0;
const type_graphql_1 = require("type-graphql");
const Contest_1 = require("../../entities/Contest");
let ContestArgs = class ContestArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ContestArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ContestArgs.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ContestArgs.prototype, "website", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ContestArgs.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ContestArgs.prototype, "start", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ContestArgs.prototype, "end", void 0);
ContestArgs = __decorate([
    type_graphql_1.InputType()
], ContestArgs);
exports.ContestArgs = ContestArgs;
let PaginatedContest = class PaginatedContest {
};
__decorate([
    type_graphql_1.Field(() => [Contest_1.Contest]),
    __metadata("design:type", Array)
], PaginatedContest.prototype, "contests", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], PaginatedContest.prototype, "hasMore", void 0);
PaginatedContest = __decorate([
    type_graphql_1.ObjectType()
], PaginatedContest);
exports.PaginatedContest = PaginatedContest;
//# sourceMappingURL=ContestArgs.js.map