import { Router } from "express";
import multer from "multer";

import { ensureUserisAnAdmin } from "../middlewares/ensureUserIsAnAdmin";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  "/",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureUserisAuthenticated,
  ensureUserisAnAdmin,
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
