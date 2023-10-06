import format from "pg-format";
import {
  IDeveloperInfos,
  IDevelopers,
  TDeveloperBody,
  TDevelopersUpdate,
} from "../interfaces/developers.interface";
import { client } from "../database";

export const createDeveloperService = async (
  body: Omit<IDevelopers, "id">
): Promise<IDevelopers> => {
  const newDeveloper = {
    name: body.name,
    email: body.email,
  };

  const queryString = format(
    `INSERT INTO developers (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newDeveloper),
    Object.values(newDeveloper)
  );

  const createDeveloper = await client.query(queryString);

  return createDeveloper.rows[0];
};

export const getDeveloperByIdService = async (
  param: string
): Promise<IDevelopers> => {
  const queryString = format(
    `
  SELECT
    d.id AS "developerId",
    d.name AS "developerName",
    d.email AS "developerEmail",
    di."developerSince" AS "developerInfoDeveloperSince",
    di."preferredOS" AS "developerInfoPreferredOS" 
  FROM developers AS d
  LEFT JOIN "developerInfos" AS di
    ON di."developerId" = d.id
  WHERE d.id = %L;`,
    param
  );

  const developer = await client.query(queryString);

  return developer.rows[0];
};

export const updateDeveloperService = async (
  body: TDevelopersUpdate,
  param: string
): Promise<IDevelopers> => {
  const updateData: TDevelopersUpdate = {};

  Object.entries(body).forEach((entry) => {
    const [key, value] = entry;

    if (key === "name" || key === "email") {
      updateData[key] = value;
    }
  });

  const queryString = format(
    `UPDATE developers SET(%I) = ROW(%L) WHERE id = %L RETURNING *;`,
    Object.keys(updateData),
    Object.values(updateData),
    param
  );

  const updateDeveloper = await client.query(queryString);

  return updateDeveloper.rows[0];
};

export const deleteDeveloperService = async (param: string): Promise<void> => {
  const queryString = format(`DELETE FROM developers WHERE id = %L;`, param);

  await client.query(queryString);
};

export const createDeveloperInfosService = async (
  body: TDeveloperBody,
  param: string
): Promise<IDeveloperInfos> => {
  const newDeveloper = {
    developerSince: body.developerSince,
    preferredOS: body.preferredOS,
    developerId: param,
  };

  const queryStringInsert = format(
    `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newDeveloper),
    Object.values(newDeveloper)
  );

  const developerInfo = await client.query(queryStringInsert);

  return developerInfo.rows[0];
};
