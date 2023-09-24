import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/providers/StorageProvider/IStorageProvider";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.forEach(async (image_name) => {
      await this.storageProvider.save(image_name, "cars");
      await this.carsImagesRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarImagesUseCase };
