import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types/MyContext";

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    console.log(req.userId);
    return await User.findOne(req.userId);
  }
}
