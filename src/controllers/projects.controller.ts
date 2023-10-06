import { Request, Response } from "express";
import {
  createProjectService,
  getProjectByIdService,
  updateProjectService,
} from "../services/projects.service";
import { IProject, IProjectCreate } from "../interfaces/projects.interface";

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createProject: IProject = await createProjectService(req.body);

  return res.status(201).json(createProject);
};

export const getProjectByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectData: IProjectCreate = await getProjectByIdService(
    req.params.projectId
  );

  return res.status(200).json(projectData);
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updateProject: IProject = await updateProjectService(
    req.body,
    req.params.projectId
  );

  return res.status(200).json(updateProject);
};
