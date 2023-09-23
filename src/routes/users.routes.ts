import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ListRentalsByUserController } from "../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listRentalsByUserController = new ListRentalsByUserController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureUserisAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get(
  "/rentals",
  ensureUserisAuthenticated,
  listRentalsByUserController.handle
);

export { usersRoutes };
