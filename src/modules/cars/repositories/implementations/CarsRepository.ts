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

  async update(car: Car): Promise<Car> {
    await this.repository.save(car);

    return this.findById(car.id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { id },
      relations: { category: true, specifications: true },
    });

    return car;
  }

  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Car[]> {
    const whereCondition = { available: true };
    if (name) whereCondition[name] = name;
    if (brand) whereCondition[brand] = brand;
    if (category_id) whereCondition[category_id] = category_id;

    const cars = await this.repository.find({
      where: whereCondition,
      relations: {
        category: true,
        specifications: true,
      },
    });

    return cars;
  }
}

export { CarsRepository };
