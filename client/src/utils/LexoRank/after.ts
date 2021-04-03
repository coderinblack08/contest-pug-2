import { Problem } from "../../generated/graphql";
import { LexoRank } from "lexorank";

export const afterRank = (problems: Problem[]): string | undefined =>
  problems?.length
    ? LexoRank.parse(problems[problems?.length - 1].rank)
        .genNext()
        .toString()
    : undefined;
