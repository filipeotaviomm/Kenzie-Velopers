import format from "pg-format";
import {
  IProject,
  IProjectCreate,
  TUpdateProject,
} from "../interfaces/projects.interface";
import { client } from "../database";

export const createProjectService = async (
  body: Omit<IProject, "id">
): Promise<IProject> => {
  const newProject = {
    name: body.name,
    description: body.description,
    repository: body.repository,
    startDate: body.startDate,
    endDate: body.endDate,
    developerId: body.developerId,
  };

  const queryString = format(
    `INSERT INTO projects (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newProject),
    Object.values(newProject)
  );

  const createProject = await client.query(queryString);

  return createProject.rows[0];
};

export const getProjectByIdService = async (
  param: string
): Promise<IProjectCreate> => {
  const queryString: string = format(
    `
    SELECT
      p.id AS "projectId",
      p.name AS "projectName",
      p.description AS "projectDescription",
      p.repository AS "projectRepository",
      p."startDate" AS "projectStartDate",
      p."endDate" AS "projectEndDate",
      d.name AS "projectDeveloperName"
    FROM projects AS p
    LEFT JOIN developers AS d
      ON p."developerId" = d.id
    WHERE p.id = %L;`,
    param
  );

  const projectInfo = await client.query(queryString);

  return projectInfo.rows[0];
};

export const updateProjectService = async (
  body: TUpdateProject,
  param: string
): Promise<IProject> => {
  const updateBody: TUpdateProject = {};

  Object.entries(body).forEach((entry) => {
    const [key, value] = entry;

    if (
      key === "name" ||
      key === "description" ||
      key === "repository" ||
      key === "startDate" ||
      key === "endDate" ||
      key === "developerId"
    ) {
      updateBody[key] = value as never;
    }
  });

  const queryString = format(
    `UPDATE projects SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
    Object.keys(updateBody),
    Object.values(updateBody),
    param
  );

  const updatedProject = await client.query(queryString);

  return updatedProject.rows[0];
};
