import { Request, Response } from "express";

import { CreateSpecificationuseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationuseCase) {}
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;
    const specification = this.createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}

export { CreateSpecificationController };
