import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const { car_id, user_id, expected_return_date } = data;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) throw new AppError("Car unavailable");

    const userWithRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (userWithRental) {
      throw new AppError("User already have a open rental");
    }

    const rentalTimeInHours = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (rentalTimeInHours < 24) {
      throw new AppError("Rental time must be at least 1 day");
    }

    await this.carsRepository.updateAvailable(car_id, false);
    return this.rentalsRepository.create(data);
  }
}

export { CreateRentalUseCase };
