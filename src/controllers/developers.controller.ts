import { Request, Response } from "express";
import {
  createDeveloperInfosService,
  createDeveloperService,
  deleteDeveloperService,
  getDeveloperByIdService,
  updateDeveloperService,
} from "../services/developers.service";
import { IDevelopers } from "../interfaces/developers.interface";

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: IDevelopers = await createDeveloperService(req.body);

  return res.status(201).json(developer);
};

export const getDeveloperByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: IDevelopers = await getDeveloperByIdService(
    req.params.developerId
  );
  return res.status(200).json(developer);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: IDevelopers = await updateDeveloperService(
    req.body,
    req.params.developerId
  );

  return res.status(200).json(developer);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.developerId);

  return res.status(204).json();
};

export const createDeveloperInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerAdditionalInfo = await createDeveloperInfosService(
    req.body,
    req.params.developerId
  );

  return res.status(201).json(developerAdditionalInfo);
};
