import { Car } from "../entities/Car";

export interface ICreateCarDto {
  name: string;
  description: string;
  license_plate: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
}

export interface ICarsRepository {
  create: (data: ICreateCarDto) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  findAvailable: (
    name?: string,
    category_id?: string,
    brand?: string
  ) => Promise<Car[]>;
}
