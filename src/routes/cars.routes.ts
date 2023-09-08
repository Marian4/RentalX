import { Router } from "express";

import { ensureUserisAnAdmin } from "../middlewares/ensureUserIsAnAdmin";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "../modules/cars/useCases/createCarSpecifications/createCarSpecificationsController";
import { ListAvailableCarsController } from "../modules/cars/useCases/listCars/listAvailbaleCarsController";

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/:id/specifications",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCarSpecificationsController.handle
);

carsRoutes.get("/", listAvailableCarsController.handle);

export { carsRoutes };
