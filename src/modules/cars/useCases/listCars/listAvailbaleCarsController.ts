import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const { name, brand, category_id } = request.query;

    const cars = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
