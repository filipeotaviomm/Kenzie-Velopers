import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { handleErrors } from "./erros";
import { developersRoutes } from "./routers/developers.routes";
import { projectsRoutes } from "./routers/projects.routes";

const app: Application = express();

app.use(express.json());

app.use("/developers", developersRoutes);
app.use("/projects", projectsRoutes);

app.use(handleErrors);

export default app;
