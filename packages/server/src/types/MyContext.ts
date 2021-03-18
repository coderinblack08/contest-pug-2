import { Request, Response } from "express";

export type MyContext = {
  req: Request & { userId: string };
  res: Response;
};
