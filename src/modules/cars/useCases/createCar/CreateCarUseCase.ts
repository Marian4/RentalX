import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) throw new AppError("Car already exists");

    const car = await this.carsRepository.create(data);

    return car;
  }
}

export { CreateCarUseCase };
