import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./createCarSpecificationsUseCase";

class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const { id } = request.params;
    const { specifications_ids } = request.body;

    const carUpdated = await createCarSpecificationsUseCase.execute({
      car_id: id,
      specifications_ids,
    });

    return response.status(200).json(carUpdated);
  }
}

export { CreateCarSpecificationsController };
