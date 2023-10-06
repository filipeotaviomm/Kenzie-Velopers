import { Router } from "express";
import {
  createDeveloperController,
  createDeveloperInfosController,
  deleteDeveloperController,
  getDeveloperByIdController,
  updateDeveloperController,
} from "../controllers/developers.controller";
import { isEmailUnique } from "../middlewares/isEmailUnique.middleware";
import { isDeveloperIdValid } from "../middlewares/isDeveloperIdValid.middleware";
import { isAdditionalInfoValid } from "../middlewares/isThereAdditionalInfo.middleware";

export const developersRoutes = Router();

developersRoutes.post("/", isEmailUnique, createDeveloperController);

developersRoutes.use("/:developerId", isDeveloperIdValid);

developersRoutes.get("/:developerId", getDeveloperByIdController);
developersRoutes.patch(
  "/:developerId",
  isEmailUnique,
  updateDeveloperController
);
developersRoutes.delete("/:developerId", deleteDeveloperController);
developersRoutes.post(
  "/:developerId/infos",
  isAdditionalInfoValid,
  createDeveloperInfosController
);
