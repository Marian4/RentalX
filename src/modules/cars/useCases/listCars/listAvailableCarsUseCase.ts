import { inject, injectable } from "tsyringe";

import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name?: string;
  category_id?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      category_id,
      brand
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
