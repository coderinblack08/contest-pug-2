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
exports.Problem = void 0;
const lexorank_1 = require("lexorank");
const typeorm_1 = require("typeorm");
const Contest_1 = require("./Contest");
let Problem = class Problem extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Problem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Problem.prototype, "contestId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ default: lexorank_1.LexoRank.middle().toString() }),
    __metadata("design:type", String)
], Problem.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column({ default: "text" }),
    __metadata("design:type", String)
], Problem.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Problem.prototype, "question", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Problem.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Problem.prototype, "penalty", void 0);
__decorate([
    typeorm_1.Column("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], Problem.prototype, "choices", void 0);
__decorate([
    typeorm_1.Column("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], Problem.prototype, "answers", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Contest_1.Contest, (c) => c.problems, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "contestId" }),
    __metadata("design:type", Promise)
], Problem.prototype, "contest", void 0);
Problem = __decorate([
    typeorm_1.Entity()
], Problem);
exports.Problem = Problem;
//# sourceMappingURL=Problem.js.map