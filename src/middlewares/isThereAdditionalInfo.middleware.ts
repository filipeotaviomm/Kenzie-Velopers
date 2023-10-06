import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../erros";
import { TClientResultInfos } from "../interfaces/developers.interface";

export const isAdditionalInfoValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString: string = `SELECT * FROM "developerInfos" WHERE "developerId" = $1;`;

  const data: TClientResultInfos = await client.query(queryString, [
    req.params.developerId,
  ]);

  if (data.rowCount) {
    throw new AppError("Developer infos already exists.", 409);
  }

  const OS = req.body.preferredOS;

  if (OS !== "Windows" && OS !== "Linux" && OS !== "MacOS") {
    throw new AppError("Invalid OS option.", 400);
  }

  next();
};
