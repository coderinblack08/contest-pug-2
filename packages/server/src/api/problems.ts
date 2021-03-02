import express from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { defaultRateLimitOptions } from "../redis";
import { isAuth } from "../utils/isAuth";
import { problemSchema } from "@contest-pug/common";
import { rateLimitMiddleware } from "../utils/rateLimitMiddleware";
import createHttpError from "http-errors";
import { getConnection } from "typeorm";
import { Problem } from "../entities/Problem";

const router = express.Router();

router.post(
  "/create",
  isAuth(),
  rateLimitMiddleware(
    new RateLimiterRedis({
      ...defaultRateLimitOptions,
      points: 500,
      duration: 60 * 60 * 12,
      keyPrefix: "rl/problems/create/",
    })
  ),
  async (req: any, res, next) => {
    try {
      await problemSchema.validate(req.body);
    } catch (err) {
      return next(createHttpError(400, err.errors));
    }
    try {
      const contest = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Problem)
        .values([req.body])
        .returning("*")
        .execute();
      res.json(contest.raw[0]);
    } catch (error) {
      console.error(error);
    }
  }
);

router.get("/:id", isAuth(), async (req: any, res, next) => {
  try {
    const problems = await getConnection().query(
      `
      SELECT * FROM problem p
      WHERE p."contestId" = $1
      ORDER BY p.rank
    `,
      [req.params.id]
    );
    res.json(problems);
  } catch (error) {
    console.error(error);
    next(createHttpError(400, error));
  }
});

export default router;
