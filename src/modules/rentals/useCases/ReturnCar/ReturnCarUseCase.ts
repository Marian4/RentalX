import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ReturnCarUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(rental_id: string) {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) throw new AppError("Rental does not exist");
  }
}

export { ReturnCarUseCase };
