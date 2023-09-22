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
  update: (car: Car) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  findById: (id: string) => Promise<Car>;
  findAvailable: (
    name?: string,
    category_id?: string,
    brand?: string
  ) => Promise<Car[]>;
  updateAvailable: (id: string, available: boolean) => Promise<void>;
}
