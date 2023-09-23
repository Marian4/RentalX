import { IsNull, Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { Rental } from "../../entities/Rental";
import { ICreateRentalDto, IRentalsRepository } from "../IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository("Rental");
  }
  async create(data: ICreateRentalDto): Promise<Rental> {
    const rental = await this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { id },
    });

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: { car: true },
    });

    return rentals;
  }

  async update(rental: Rental): Promise<Rental> {
    await this.repository.save(rental);

    return this.findById(rental.id);
  }
}

export { RentalsRepository };
