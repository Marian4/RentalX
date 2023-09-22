import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ReturnCarUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(rental_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) throw new AppError("Rental does not exist");

    const car = await this.carsRepository.findById(rental.car_id);

    rental.end_date = this.dateProvider.dateNow();
    const rentalDays = this.dateProvider.compareInDays(
      rental.start_date,
      rental.end_date
    );
    const rentalDailes = Math.ceil(rentalDays);

    let returnDelay = Math.ceil(
      this.dateProvider.compareInDays(
        rental.expected_return_date,
        rental.end_date
      )
    );

    if (returnDelay < 0) returnDelay = 0;

    rental.total =
      rentalDailes * car.daily_rate + returnDelay * car.fine_amount;

    await this.carsRepository.updateAvailable(car.id, true);
    return this.rentalsRepository.update(rental);
  }
}

export { ReturnCarUseCase };
