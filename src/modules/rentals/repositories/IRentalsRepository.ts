import { Rental } from "../entities/Rental";

export interface ICreateRentalDto {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

export interface IRentalsRepository {
  create(data: ICreateRentalDto): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
  update(rental: Rental): Promise<Rental>;
}
