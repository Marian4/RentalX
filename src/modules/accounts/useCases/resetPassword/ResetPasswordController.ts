import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
    const { token } = request.query;
    const { new_password } = request.body;

    await resetPasswordUseCase.execute({ token: String(token), new_password });

    return response.status(200).json();
  }
}

export { ResetPasswordController };
