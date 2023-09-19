import { Router } from "express";

import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateRentalController } from "../modules/rentals/useCases/CreateRentalController";

const createRentalController = new CreateRentalController();

const rentalsRoutes = Router();

rentalsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  createRentalController.handle
);

export { rentalsRoutes };
