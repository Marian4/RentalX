import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUsecase";

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const { id } = request.params;
    const images = request.files as IFile[];
    const images_names = images.map((image) => image.filename);

    uploadCarImagesUseCase.execute({ car_id: id, images_names });

    return response.status(201).json();
  }
}

export { UploadCarImagesController };
