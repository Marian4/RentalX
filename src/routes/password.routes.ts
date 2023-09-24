import { Router } from "express";

import { SendForgotPassMailController } from "../modules/accounts/useCases/sendForgotPassMail/sendForgotPassMailController";

const sendForgotPassMailController = new SendForgotPassMailController();

const passwordRoutes = Router();

passwordRoutes.post("/forgot", sendForgotPassMailController.handle);
// passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
