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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    typeorm_1.Column("text", { unique: true, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("text", { unique: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "googleAccessToken", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "googleRefreshToken", void 0);
__decorate([
    typeorm_1.Column("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "other", void 0);
__decorate([
    typeorm_1.Column("int", { default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "time with time zone" }),
    __metadata("design:type", Number)
], User.prototype, "createdAt", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map