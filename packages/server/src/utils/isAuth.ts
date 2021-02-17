import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { User } from "../entities/User";
import {
  AccessTokenData,
  createTokens,
  RefreshTokenData,
} from "./createTokens";

export const isAuth = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  const accessToken = req.headers["access-token"];
  if (typeof accessToken !== "string") {
    return next(createHttpError(401, "Not authorized"));
  }

  try {
    const data = <AccessTokenData>(
      verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    );
    (req as any).userId = data.userId;
    return next();
  } catch {}

  const refreshToken = req.headers["refresh-token"];
  if (typeof refreshToken !== "string") {
    return next(createHttpError(401, "Not authorized"));
  }

  let data;
  try {
    data = <RefreshTokenData>(
      verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
  } catch {
    return next(createHttpError(401, "Not authorized"));
  }

  const user = await User.findOne(data.userId);

  if (!user || user.tokenVersion !== data.tokenVersion) {
    return next(createHttpError(401, "Not authorized"));
  }

  const { refreshToken: rt, accessToken: at } = createTokens(user);
  res.setHeader("refresh-token", rt); // TODO: maybe keep refresh-token the same if possible in future
  res.setHeader("access-token", at);

  next();
};
