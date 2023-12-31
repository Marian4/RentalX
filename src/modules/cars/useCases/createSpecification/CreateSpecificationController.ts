import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationuseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationuseCase
    );
    const { name, description } = request.body;
    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}

export { CreateSpecificationController };
