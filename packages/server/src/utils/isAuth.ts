import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { User } from "../entities/User";
import { createTokens } from "./createTokens";

export const isAuth: (
  shouldThrow?: boolean
) => RequestHandler<{}, any, any, {}> = (shouldThrow = true) => async (
  req,
  res,
  next
) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken || typeof accessToken !== "string") {
    return next(
      !shouldThrow ? undefined : createHttpError(401, "Not authorized")
    );
  }

  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;

    (req as any).userId = data.userId;
    return next();
  } catch {}

  const refreshToken = req.headers["refresh-token"];
  if (typeof refreshToken !== "string") {
    return next(
      !shouldThrow ? undefined : createHttpError(401, "Not authorized")
    );
  }

  let data;
  try {
    data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
    console.log("refreshToken", data);
  } catch (err) {
    return next(
      !shouldThrow ? undefined : createHttpError(401, "Not authorized")
    );
  }

  const user = await User.findOne(data.userId);

  if (!user || user.tokenVersion !== data.tokenVersion) {
    return next(
      !shouldThrow ? undefined : createHttpError(401, "Not authorized")
    );
  }

  const tokens = createTokens(user);

  res.setHeader("refresh-token", tokens.refreshToken);
  res.setHeader("access-token", tokens.accessToken);
  (req as any).userId = data.userId;

  next();
};
