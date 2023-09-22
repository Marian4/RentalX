import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDto } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async update(car: Car): Promise<Car> {
    const index = this.cars.findIndex((item) => item.id === car.id);
    this.cars[index] = car;

    return this.cars[index];
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available === true);

    if (name || category_id || brand) {
      return cars.filter((car) => {
        return (
          (name && car.name === name) ||
          (category_id && car.category_id === category_id) ||
          (brand && car.brand === brand)
        );
      });
    }

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    this.cars.map((car) => {
      return car.id === id ? { ...car, available } : car;
    });
  }
}

export { CarsRepositoryInMemory };
