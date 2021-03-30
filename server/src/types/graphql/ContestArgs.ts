import { Field, InputType, ObjectType } from "type-graphql";
import { Contest } from "../../entities/Contest";

@InputType()
export class ContestArgs {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  website: string | null;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  start: string | null;

  @Field(() => String, { nullable: true })
  end: string | null;
}

@ObjectType()
export class PaginatedContest {
  @Field(() => [Contest])
  contests: Contest[];

  @Field(() => Boolean)
  hasMore: boolean;
}
