import { problemSchema } from "@contest-pug/common";
import express from "express";
import createHttpError from "http-errors";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { getConnection } from "typeorm";
import { Contest } from "../entities/Contest";
import { Problem } from "../entities/Problem";
import { defaultRateLimitOptions } from "../redis";
import { isAuth } from "../utils/isAuth";
import { rateLimitMiddleware } from "../utils/rateLimitMiddleware";

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
      WHERE p."contestId" = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
      ORDER BY p.rank
    `,
      [req.params.id, req.userId]
    );
    res.json(problems);
  } catch (error) {
    console.error(error);
    next(createHttpError(400, error));
  }
});

router.put("/update", isAuth(), async (req: any, res, next) => {
  try {
    const isOwner = await Contest.findOne({
      id: req.body.contestId,
      creatorId: req.userId,
    });
    if (isOwner) {
      await Problem.update({ id: req.body.id }, req.body);
      res.send(true);
    } else {
      next(createHttpError(401, "not authorized"));
    }
  } catch (error) {
    console.error(error);
    next(createHttpError(400, error));
  }
});

router.delete("/:id", isAuth(), async (req: any, res, next) => {
  try {
    await getConnection().query(
      `
      DELETE FROM problem p
      WHERE p.id = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
    `,
      [req.params.id, req.userId]
    );
    res.send(true);
  } catch (error) {
    console.error(error);
    next(createHttpError(400, error));
  }
});

export default router;
