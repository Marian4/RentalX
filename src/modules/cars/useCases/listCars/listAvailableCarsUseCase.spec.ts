import { Car } from "../../entities/Car";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let carsRepository: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let car1: Car;
let car2: Car;

describe("List Cars", () => {
  beforeAll(async () => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);

    car1 = await carsRepository.create({
      name: "example name",
      description: "example description",
      license_plate: "ABC-1234",
      brand: "Fiat",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "1010",
    });

    car2 = await carsRepository.create({
      name: "example name 2",
      description: "example description 2",
      license_plate: "ABC-4321",
      brand: "Fiat",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "2020",
    });
  });

  it("Should be able to list all available cars", async () => {
    const cars = await listAvailableCarsUseCase.execute({});

    expect(
      Array.isArray(cars) && cars.every((car) => car.available === true)
    ).toBeTruthy();
  });

  it("Should be able to apply filters on the listing", async () => {
    const carsByName = await listAvailableCarsUseCase.execute({
      name: car1.name,
    });
    const carsByBrand = await listAvailableCarsUseCase.execute({
      brand: car1.brand,
    });
    const carsByCategory = await listAvailableCarsUseCase.execute({
      category_id: car2.category_id,
    });

    expect(carsByName).toEqual([car1]);
    expect(carsByBrand).toEqual([car1, car2]);
    expect(carsByCategory).toEqual([car2]);
  });
});
