import { Router } from "express";

import { ResetPasswordController } from "../modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPassMailController } from "../modules/accounts/useCases/sendForgotPassMail/sendForgotPassMailController";

const sendForgotPassMailController = new SendForgotPassMailController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();

passwordRoutes.post("/forgot", sendForgotPassMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
