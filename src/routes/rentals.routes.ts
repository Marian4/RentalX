import { Router } from "express";

import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateRentalController } from "../modules/rentals/useCases/CreateRental/CreateRentalController";
import { ReturnCarController } from "../modules/rentals/useCases/ReturnCar/ReturnCarController";

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();

const rentalsRoutes = Router();

rentalsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  createRentalController.handle
);

rentalsRoutes.post(
  "/:id/devolution",
  ensureUserisAuthenticated,
  returnCarController.handle
);

export { rentalsRoutes };
