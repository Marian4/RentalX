import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { CarImage } from "../../entities/CarImage";
import {
  ICarsImagesRepository,
  ICreateCarImageDto,
} from "../ICarsImagesRepository";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(data: ICreateCarImageDto): Promise<void> {
    const carImage = await this.repository.create(data);

    await this.repository.save(carImage);
  }
}

export { CarsImagesRepository };
