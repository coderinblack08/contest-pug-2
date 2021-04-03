import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ProblemArgs {
  @Field()
  contestId: string;

  @Field(() => String, { nullable: true })
  rank?: string;

  @Field()
  question: string;

  @Field()
  type: "short_answer" | "free_response";

  @Field(() => Int, { nullable: true })
  points?: number;

  @Field(() => Int, { nullable: true })
  penalty?: number;
}

@InputType()
export class ProblemUpdateArgs {
  @Field(() => String, { nullable: true })
  rank?: string;

  @Field({ nullable: true })
  question?: string;

  @Field({ nullable: true })
  type?: "short_answer" | "free_response";

  @Field(() => Int, { nullable: true })
  points?: number;

  @Field(() => Int, { nullable: true })
  penalty?: number;
}
