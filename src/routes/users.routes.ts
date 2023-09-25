import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureUserisAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { GetUserProfileController } from "../modules/accounts/useCases/getUserProfile/GetUserProfileController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ListRentalsByUserController } from "../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listRentalsByUserController = new ListRentalsByUserController();
const getUserProfileController = new GetUserProfileController();

const uploadAvatar = multer(uploadConfig);

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

usersRoutes.get(
  "/profile",
  ensureUserisAuthenticated,
  getUserProfileController.handle
);

export { usersRoutes };
