import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnCarUseCase } from "./ReturnCarUseCase";

class ReturnCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const returnCarUseCase = container.resolve(ReturnCarUseCase);
    const { id } = request.params;
    const updatedRental = await returnCarUseCase.execute(id);

    return response.status(200).json(updatedRental);
  }
}

export { ReturnCarController };
