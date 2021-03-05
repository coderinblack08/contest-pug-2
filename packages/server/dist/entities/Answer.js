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
exports.Answer = void 0;
const lexorank_1 = require("lexorank");
const typeorm_1 = require("typeorm");
const Problem_1 = require("./Problem");
let Answer = class Answer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "problemId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ default: lexorank_1.LexoRank.middle().toString() }),
    __metadata("design:type", String)
], Answer.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "answer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Problem_1.Problem, (p) => p.answer, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "problemId" }),
    __metadata("design:type", Promise)
], Answer.prototype, "problem", void 0);
Answer = __decorate([
    typeorm_1.Entity()
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map