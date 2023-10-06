import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { TClientResult } from "../interfaces/developers.interface";
import { AppError } from "../erros";

export const isEmailUnique = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.body.email) return next();

  const queryString: string = `SELECT * FROM developers WHERE email = $1;`;

  const data: TClientResult = await client.query(queryString, [req.body.email]);

  if (data.rowCount) {
    throw new AppError("Email already exists.", 409);
  }

  next();
};
