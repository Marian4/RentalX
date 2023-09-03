import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDto } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDto): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }
}

export { CarsRepository };
