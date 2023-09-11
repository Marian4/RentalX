import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.forEach(async (image_name) => {
      await this.carsImagesRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarImagesUseCase };
