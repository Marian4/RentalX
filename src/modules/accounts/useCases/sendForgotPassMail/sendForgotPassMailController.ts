import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPassMailUseCase } from "./sendForgotPassMailUseCase";

class SendForgotPassMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendForgotPassMailUseCase = container.resolve(
      SendForgotPassMailUseCase
    );
    const { email } = request.body;
    await sendForgotPassMailUseCase.execute(email);

    return response.status(200).json();
  }
}

export { SendForgotPassMailController };
