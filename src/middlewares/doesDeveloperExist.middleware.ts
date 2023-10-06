import { NextFunction, Request, Response } from "express";
import { TClientResult } from "../interfaces/developers.interface";
import { client } from "../database";
import { AppError } from "../erros";

export const doesDeveloperExist = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM developers WHERE id = $1;`;

  const data: TClientResult = await client.query(queryString, [
    req.body.developerId,
  ]);

  if (!req.body.developerId) {
    return next();
  }

  if (!data.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  next();
};
