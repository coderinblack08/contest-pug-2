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
exports.isAuth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entities/User");
const createTokens_1 = require("./createTokens");
const isAuth = (shouldThrow = true) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers["access-token"];
    if (typeof accessToken !== "string") {
        return next(!shouldThrow ? undefined : http_errors_1.default(401, "Not authorized"));
    }
    try {
        const data = (jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET));
        req.userId = data.userId;
        return next();
    }
    catch (_a) { }
    const refreshToken = req.headers["refresh-token"];
    if (typeof refreshToken !== "string") {
        return next(!shouldThrow ? undefined : http_errors_1.default(401, "Not authorized"));
    }
    let data;
    try {
        data = (jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
    }
    catch (err) {
        return next(!shouldThrow ? undefined : http_errors_1.default(401, "Not authorized"));
    }
    const user = yield User_1.User.findOne(data.userId);
    if (!user || user.tokenVersion !== data.tokenVersion) {
        return next(!shouldThrow ? undefined : http_errors_1.default(401, "Not authorized"));
    }
    const { refreshToken: rt, accessToken: at } = createTokens_1.createTokens(user);
    res.setHeader("refresh-token", rt);
    res.setHeader("access-token", at);
    res.userId = user.id;
    next();
});
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map