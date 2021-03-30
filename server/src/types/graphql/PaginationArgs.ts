import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  limit: number;

  @Field(() => String, { nullable: true })
  cursor: string | null;
}
