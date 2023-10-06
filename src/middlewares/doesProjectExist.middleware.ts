import { NextFunction, Request, Response } from "express";
import { TClientResult } from "../interfaces/developers.interface";
import { client } from "../database";
import { AppError } from "../erros";

export const doesProjectExist = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM projects WHERE id = $1;`;

  const data: TClientResult = await client.query(queryString, [
    req.params.projectId,
  ]);

  if (!data.rowCount) {
    throw new AppError("Project not found.", 404);
  }

  next();
};
