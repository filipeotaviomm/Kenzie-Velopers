import { Router } from "express";
import {
  createProjectController,
  getProjectByIdController,
  updateProjectController,
} from "../controllers/projects.controller";
import { doesDeveloperExist } from "../middlewares/doesDeveloperExist.middleware";
import { doesProjectExist } from "../middlewares/doesProjectExist.middleware";

export const projectsRoutes = Router();

projectsRoutes.post("/", doesDeveloperExist, createProjectController);

projectsRoutes.use("/:projectId", doesProjectExist);

projectsRoutes.get("/:projectId", getProjectByIdController);
projectsRoutes.patch(
  "/:projectId",
  doesDeveloperExist,
  updateProjectController
);
