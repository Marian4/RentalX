import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);
    const { id } = request.user;
    const profile = await getUserProfileUseCase.execute(id);

    return response.status(200).json(profile);
  }
}

export { GetUserProfileController };
