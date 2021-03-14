import { Resolver, Query } from "type-graphql";

@Resolver()
export class Hello {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}
