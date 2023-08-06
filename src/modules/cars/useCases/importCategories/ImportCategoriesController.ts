import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  handle(request: Request, response: Response): Response {
    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);
    const { file } = request;
    importCategoriesUseCase.execute(file);
    return response.status(201).send();
  }
}

export { ImportCategoriesController };
