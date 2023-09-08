import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
class CreateCarSpecificationsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_ids }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError("Car does not exist");

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    car.specifications = specifications;

    const carUpdated = await this.carsRepository.update(car);
    console.log(carUpdated);

    return carUpdated;

    // diff de specifications pra n sobrepor
  }
}

export { CreateCarSpecificationsUseCase };
