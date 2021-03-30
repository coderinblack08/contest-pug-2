import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";
import { isValid } from "date-fns";
import { Contest } from "../entities/Contest";
import { isAuth } from "../middlewares/isAuth";
import { ContestArgs, PaginatedContest } from "../types/graphql/ContestArgs";
import { PaginationArgs } from "../types/graphql/PaginationArgs";
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

  @Query(() => Contest)
  async getContest(@Arg("id") id: string) {
    const contest: any = await createQueryBuilder("contest", "c")
      .innerJoinAndSelect("c.creator", "user")
      .where("c.id = :id", { id })
      .getOne();
    contest.isCreator = true;
    return contest;
  }
}
