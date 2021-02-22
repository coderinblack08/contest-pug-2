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
exports.Member = void 0;
const typeorm_1 = require("typeorm");
const Contest_1 = require("./Contest");
const User_1 = require("./User");
let Member = class Member extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Member.prototype, "id", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Member.prototype, "contestId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Member.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Contest_1.Contest, (u) => u.members, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "contestId" }),
    __metadata("design:type", Promise)
], Member.prototype, "contest", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (u) => u.joined, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", Promise)
], Member.prototype, "user", void 0);
Member = __decorate([
    typeorm_1.Entity()
], Member);
exports.Member = Member;
//# sourceMappingURL=Member.js.map