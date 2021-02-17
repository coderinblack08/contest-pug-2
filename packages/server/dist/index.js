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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const createTokens_1 = require("./utils/createTokens");
const User_1 = require("./entities/User");
require("dotenv-safe").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "contest-pug",
        entities: [path_1.join(__dirname, "./entities/*")],
        migrations: [path_1.join(__dirname, "./migrations/*")],
        logging: !constants_1.__prod__,
        synchronize: !constants_1.__prod__,
    });
    yield conn.runMigrations();
    const app = express_1.default();
    app.use(helmet_1.default());
    app.use(passport_1.default.initialize());
    passport_1.default.serializeUser((user, done) => done(null, user.accessToken));
    const strategy = new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
    }, (googleAccessToken, googleRefreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log(profile);
        try {
            let user = yield User_1.User.findOne({ where: { googleId: profile.id } });
            const data = {
                googleAccessToken,
                googleRefreshToken,
                googleId: profile.id,
                profilePicture: ((_a = profile.photos) === null || _a === void 0 ? void 0 : _a[0].value) ||
                    profile._json.avatar_url ||
                    "",
                other: profile._json,
                username: profile.name ? Object.values(profile.name).join(" ") : null,
            };
            if (user) {
                yield User_1.User.update(user.id, data);
            }
            else {
                user = yield User_1.User.create(data).save();
            }
            cb(undefined, createTokens_1.createTokens(user));
        }
        catch (err) {
            cb(new Error("Internal Error"));
        }
    }));
    passport_1.default.use(strategy);
    app.get("/auth/google", passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "", session: false }), (req, res) => {
        if (!req.user.accessToken || !req.user.refreshToken) {
            res.send("Internal error while logging in");
        }
        res.redirect(`http://localhost:3000/auth/?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`);
    });
    if (!constants_1.__prod__) {
        app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield User_1.User.find({})); }));
    }
    app.listen(constants_1.port, () => console.log(`Listening on port ${constants_1.port}`));
});
main();
//# sourceMappingURL=index.js.map