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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entities/User");
const createTokens_1 = require("../utils/createTokens");
const isAuth = ({ context: { req, res } }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers["access-token"];
    if (!accessToken || typeof accessToken !== "string") {
        throw new Error("No authorized");
    }
    try {
        const data = jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = data.userId;
        return next();
    }
    catch (_a) { }
    const refreshToken = req.headers["refresh-token"];
    if (typeof refreshToken !== "string") {
        throw new Error("No authorized");
    }
    let data;
    try {
        data = jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log("refreshToken", data);
    }
    catch (err) {
        throw new Error("No authorized");
    }
    const user = yield User_1.User.findOne(data.userId);
    if (!user || user.tokenVersion !== data.tokenVersion) {
        throw new Error("No authorized");
    }
    const tokens = createTokens_1.createTokens(user);
    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    req.userId = data.userId;
    return next();
});
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map