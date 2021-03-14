import "reflect-metadata";
import express from "express";
import passport from "passport";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { __port__, __prod__ } from "./constants";
import { Hello } from "./resolvers/Hello";
import { join } from "path";
import cors from "cors";
import { User } from "./entities/User";
import { createTokens } from "./utils/createTokens";
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
  app.use(passport.initialize());

  app.use(
    cors({
      origin: "*",
      maxAge: __prod__ ? 86400 : undefined,
      exposedHeaders: [
        "access-token",
        "refresh-token",
        "content-type",
        "content-length",
      ],
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

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
          username: profile.name ? Object.values(profile.name).join(" ") : null,
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

  app.listen(__port__, () => console.log(`Server started on port ${__port__}`));
};

main().catch((err) => console.error(err));
