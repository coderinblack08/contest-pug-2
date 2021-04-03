import { isValid } from "date-fns";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";
import { Contest } from "../entities/Contest";
import { Problem } from "../entities/Problem";
import { isAuth } from "../middlewares/isAuth";
import { ContestArgs, PaginatedContest } from "../types/graphql/ContestArgs";
import { PaginationArgs } from "../types/graphql/PaginationArgs";
import { ProblemArgs, ProblemUpdateArgs } from "../types/graphql/ProblemArgs";
import { MyContext } from "../types/MyContext";

@Resolver(Contest)
export class ContestResolver {
  @Mutation(() => Contest)
  @UseMiddleware(isAuth)
  async createContest(
    @Arg("args", () => ContestArgs) args: ContestArgs,
    @Ctx() { req }: MyContext
  ) {
    if (args.start) {
      if (!isValid(new Date(args.start))) {
        throw new Error("Invalid start timestamp");
      }
    }
    if (args.end) {
      if (!isValid(new Date(args.end))) {
        throw new Error("Invalid end timestamp");
      }
    }
    return Contest.create({ ...args, creatorId: req.userId }).save();
  }

  @Query(() => PaginatedContest)
  @UseMiddleware(isAuth)
  async findContests(
    @Arg("args", () => PaginationArgs) { limit, cursor }: PaginationArgs
  ): Promise<PaginatedContest> {
    limit = Math.min(50, limit);

    const replacements: any[] = [limit + 1];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const contests = await getConnection().query(
      `
      SELECT c.*
      FROM contest c
      ${cursor ? `WHERE c."createdAt" < $2` : ""}
      ORDER BY c."createdAt" DESC
      LIMIT $1
    `,
      replacements
    );

    return {
      contests: contests.slice(0, limit),
      hasMore: contests.length === limit + 1,
    };
  }

  @UseMiddleware(isAuth)
  @Query(() => Contest)
  async getContest(@Arg("id") id: string) {
    const contest: any = await createQueryBuilder("contest", "c")
      .innerJoinAndSelect("c.creator", "user")
      .where("c.id = :id", { id })
      .getOne();
    contest.isCreator = true;
    return contest;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Problem)
  async createProblem(@Arg("args", () => ProblemArgs) args: ProblemArgs) {
    console.log(args);

    return Problem.create(args).save();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Problem)
  async updateProblem(
    @Arg("id", () => Int) id: number,
    @Arg("args", () => ProblemUpdateArgs) args: ProblemUpdateArgs
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Problem)
      .set(args)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @UseMiddleware(isAuth)
  @Query(() => [Problem])
  async findProblems(@Arg("contestId") contestId: string, @Ctx() { req }: MyContext) {
    return await getConnection().query(
      `
      SELECT * FROM problem p
      WHERE p."contestId" = $1 AND EXISTS (
        SELECT * FROM contest c WHERE c.id = p."contestId" AND c."creatorId" = $2
      )
      ORDER BY p.rank;
    `,
      [contestId, req.userId]
    );
  }
}
