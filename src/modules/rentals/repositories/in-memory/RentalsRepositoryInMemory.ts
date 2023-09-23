import { Rental } from "../../entities/Rental";
import { ICreateRentalDto, IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async create(data: ICreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, { ...data, start_date: new Date() });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentals.filter(
      (rental) => rental.user_id === user_id
    );

    return rentals;
  }

  async update(rental: Rental): Promise<Rental> {
    const index = this.rentals.findIndex((item) => item.id === rental.id);
    this.rentals[index] = rental;

    return this.rentals[index];
  }
}

export { RentalsRepositoryInMemory };
