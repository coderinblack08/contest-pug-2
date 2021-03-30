import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}
