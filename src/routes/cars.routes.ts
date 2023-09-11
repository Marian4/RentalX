import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureUserisAnAdmin } from "../middlewares/ensureUserIsAnAdmin";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "../modules/cars/useCases/createCarSpecifications/createCarSpecificationsController";
import { ListAvailableCarsController } from "../modules/cars/useCases/listCars/listAvailbaleCarsController";
import { UploadCarImagesController } from "../modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/:id/images",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

carsRoutes.post(
  "/:id/specifications",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCarSpecificationsController.handle
);

carsRoutes.get("/", listAvailableCarsController.handle);

export { carsRoutes };
