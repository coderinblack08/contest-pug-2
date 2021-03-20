import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";
import { createTokens } from "../utils/createTokens";

export const isAuth: MiddlewareFn<MyContext> = async ({ context: { req, res } }, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken || typeof accessToken !== "string") {
    throw new Error("Not authorized");
  }

  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;

    (req as any).userId = data.userId;
    return next();
  } catch {}

  const refreshToken = req.headers["refresh-token"];
  if (typeof refreshToken !== "string") {
    throw new Error("Not authorized");
  }

  let data;
  try {
    data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
    console.log("refreshToken", data);
  } catch (err) {
    throw new Error("Not authorized");
  }

  const user = await User.findOne(data.userId);

  if (!user || user.tokenVersion !== data.tokenVersion) {
    throw new Error("Not authorized");
  }

  const tokens = createTokens(user);

  res.setHeader("refresh-token", tokens.refreshToken);
  res.setHeader("access-token", tokens.accessToken);
  (req as any).userId = data.userId;

  return next();
};
