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
    let index;

    this.cars.map((c, i) => {
      if (c.id === car.id) {
        index = i;
        return car;
      }
      return c;
    });

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
}

export { CarsRepositoryInMemory };
