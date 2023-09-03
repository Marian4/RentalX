import { Router } from "express";

import { ensureUserisAnAdmin } from "../middlewares/ensureUserIsAnAdmin";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
