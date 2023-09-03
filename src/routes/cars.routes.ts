import { Router } from "express";

import { ensureUserisAnAdmin } from "../middlewares/ensureUserIsAnAdmin";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";

const createCarController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCarController.handle
);

export { carsRoutes };
