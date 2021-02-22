import { contestSchema } from "@contest-pug/common";
import express from "express";
import createHttpError from "http-errors";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { getConnection } from "typeorm";
import { defaultRateLimitOptions } from "../redis";
import { Contest } from "../entities/Contest";
import { isAuth } from "../utils/isAuth";
import { rateLimitMiddleware } from "../utils/rateLimitMiddleware";

const router = express.Router();

router.post(
  "/create",
  isAuth(),
  rateLimitMiddleware(
    new RateLimiterRedis({
      ...defaultRateLimitOptions,
      points: 10,
      duration: 60 * 60 * 12,
      keyPrefix: "rl/contests/create/",
    })
  ),
  async (req: any, res, next) => {
    try {
      await contestSchema.validate(req.body);
    } catch (err) {
      return next(createHttpError(400, err.errors));
    }
    try {
      const contest = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Contest)
        .values([{ ...req.body, creatorId: req.userId }])
        .returning("*")
        .execute();
      res.json(contest.raw[0]);
    } catch (error) {
      if (error.message.includes("duplicate key")) {
        return next(createHttpError(400, "duplicate name"));
      } else {
        console.error(error);
      }
    }
  }
);

router.get("/", isAuth(), async (req: any, res) => {
  const contests = await getConnection().query(
    `
    SELECT c.* FROM contest c INNER JOIN member m ON (m."contestId" = c.id)
    union
    SELECT c.* FROM contest c WHERE c."creatorId" = $1
    `,
    [req.userId]
  );

  console.log(contests);

  res.json(contests);
});

export default router;
