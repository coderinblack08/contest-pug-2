import express from "express";
import helmet from "helmet";
import { join } from "path";
import { createConnection } from "typeorm";
import { port, __prod__ } from "./constants";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createTokens } from "./utils/createTokens";
import { User } from "./entities/User";
require("dotenv-safe").config();

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "contest-pug",
    entities: [join(__dirname, "./entities/*")],
    migrations: [join(__dirname, "./migrations/*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });

  await conn.runMigrations();

  const app = express();
  // app.set("trust proxy", 1);
  app.use(helmet());
  app.use(passport.initialize());

  passport.serializeUser((user: any, done) => done(null, user.accessToken));

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
      },
      async (googleAccessToken, __, profile, cb) => {
        console.log(profile);
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });
          const data: Partial<User> = {
            googleAccessToken,
            googleId: profile.id,
            profilePicture:
              profile.photos?.[0].value ||
              (profile._json as any).avatar_url ||
              "",
            other: profile._json,
            // profileURL: profile.profileUrl,
            username: profile.name
              ? Object.values(profile.name).join(" ")
              : null, // TODO: Given name backup + Something other than null
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
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "", session: false }), // TODO: Add failure redirect
    (_req, res) => {
      res.send("logged in successfully");
    }
  );

  if (!__prod__) {
    app.get("/users", async (_req, res) => res.json(await User.find({})));
  }

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
