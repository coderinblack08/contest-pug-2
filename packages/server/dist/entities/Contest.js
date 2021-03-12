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
exports.Contest = void 0;
const typeorm_1 = require("typeorm");
const Member_1 = require("./Member");
const Problem_1 = require("./Problem");
const User_1 = require("./User");
let Contest = class Contest extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Contest.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Contest.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Contest.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Contest.prototype, "website", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Contest.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("int", { default: 0 }),
    __metadata("design:type", Number)
], Contest.prototype, "competitors", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Contest.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (u) => u.contests, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "creatorId" }),
    __metadata("design:type", Promise)
], Contest.prototype, "creator", void 0);
__decorate([
    typeorm_1.OneToMany(() => Member_1.Member, (m) => m.contest),
    __metadata("design:type", Promise)
], Contest.prototype, "members", void 0);
__decorate([
    typeorm_1.OneToMany(() => Problem_1.Problem, (p) => p.contest),
    __metadata("design:type", Promise)
], Contest.prototype, "problems", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "time with time zone" }),
    __metadata("design:type", Date)
], Contest.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "time with time zone" }),
    __metadata("design:type", Date)
], Contest.prototype, "createdAt", void 0);
Contest = __decorate([
    typeorm_1.Entity()
], Contest);
exports.Contest = Contest;
//# sourceMappingURL=Contest.js.map