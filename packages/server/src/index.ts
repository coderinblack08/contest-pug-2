import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { join } from "path";
import { createConnection } from "typeorm";
import contestRouter from "./api/contest";
import { port, __prod__ } from "./constants";
import { User } from "./entities/User";
import { createTokens } from "./utils/createTokens";
import { isAuth } from "./utils/isAuth";
require("dotenv-safe").config();

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "contest-pug",
    entities: [join(__dirname, "./entities/*")],
    migrations: [join(__dirname, "./migrations/*")],
    logging: !__prod__,
    synchronize: !__prod__,
    // dropSchema: true
  });

  await conn.runMigrations();

  const app = express();
  // app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: "*", // https://localhost:3000
      maxAge: __prod__ ? 86400 : undefined,
      exposedHeaders: [
        "access-token",
        "refresh-token",
        "content-type",
        "content-length",
      ],
      // credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use("/contests", contestRouter);

  passport.serializeUser((user: any, done) => done(null, user.accessToken));

  const strategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CONSUMER_KEY,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (googleAccessToken, googleRefreshToken, profile, cb) => {
      console.log(profile);
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        const data: Partial<User> = {
          googleAccessToken, // 1 hour expiration
          googleRefreshToken,
          googleId: profile.id,
          profilePicture:
            profile.photos?.[0].value ||
            (profile._json as any).avatar_url ||
            "",
          other: profile._json,
          // profileURL: profile.profileUrl,
          username: profile.name ? Object.values(profile.name).join(" ") : null, // TODO: Given name backup + Something other than null
        };
        if (user) {
          await User.update(user.id, data);
        } else {
          user = await User.create(data).save();
        }
        cb(undefined, createTokens(user));
      } catch (err) {
        cb(new Error("Internal Error"));
      }
    }
  );

  passport.use(strategy);

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  app.get("/auth/google/error", (_, res) =>
    res.send(
      `<!DOCTYPE html> <html> <body> <p>An error occurred while authenticating.</p> <a href="/auth/google">Try again</a>. </body> </html>`
    )
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/error",
      session: false,
    }),
    (req: any, res) => {
      if (!req.user.accessToken || !req.user.refreshToken) {
        res.send("Internal error while logging in");
      }
      res.redirect(
        `http://localhost:3000/?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`
      );
    }
  );

  if (!__prod__) {
    app.get("/users", async (_req, res) => res.json(await User.find({})));
  }

  // @ts-ignore
  app.get("/me", isAuth(false), async (req: any, res) => {
    if (!req.userId) {
      return res.json(null);
    }
    res.json(await User.findOne(req.userId));
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
