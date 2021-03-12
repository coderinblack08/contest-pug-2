import { contestSchema } from "@contest-pug/common";
import express from "express";
import createHttpError from "http-errors";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { getConnection } from "typeorm";
import { defaultRateLimitOptions } from "../redis";
import { Contest } from "../entities/Contest";
import { isAuth } from "../utils/isAuth";
import { rateLimitMiddleware } from "../utils/rateLimitMiddleware";
import { Member } from "../entities/Member";

const router = express.Router();

router.post("/join", isAuth(), async (req: any, res, next) => {
  try {
    await Member.insert({
      contestId: req.body.contestId,
      userId: req.userId,
    });
    await getConnection()
      .getRepository(Contest)
      .increment({ id: req.body.contestId }, "competitors", 1);
    res.send(true);
  } catch (error) {
    next(createHttpError(400, new Error(error)));
  }
});

router.post("/unjoin", isAuth(), async (req: any, res, next) => {
  try {
    const deletion = await Member.delete({
      contestId: req.body.contestId,
      userId: req.userId,
    });
    if (deletion.affected === 1) {
      await getConnection()
        .getRepository(Contest)
        .decrement({ id: req.body.contestId }, "competitors", 1);
      return res.send(true);
    }
    res.send(false);
  } catch (error) {
    next(createHttpError(400, new Error(error)));
  }
});

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

router.get("/joined", isAuth(), async (req: any, res) => {
  const contests = await getConnection().query(
    `
      SELECT c.* FROM contest c WHERE c."creatorId" = $1
      OR
      EXISTS (SELECT * FROM member m WHERE m."contestId" = c.id AND m."userId" = $1)
    `,
    [req.userId]
  );

  console.log(contests);

  res.json(contests);
});

router.get("/:id", isAuth(), async (req: any, res, next) => {
  console.log(req.params);

  try {
    const contests = await getConnection().query(
      `
        SELECT c.*,
        EXISTS (SELECT * FROM member m WHERE m."userId" = $2 AND m."contestId" = $1) joined,
        json_build_object(
          'id', u.id,
          'name', u.username,
          'profilePicture', u."profilePicture"
        ) creator
        FROM contest c
        INNER JOIN public.user u ON u.id = c."creatorId"
        WHERE c.id = $1
      `,
      [req.params.id, req.userId]
    );
    contests[0].isOwner = req.userId === contests[0].creatorId;
    res.send(contests[0]);
  } catch (error) {
    next(createHttpError(400, new Error(error)));
  }
});

export default router;
