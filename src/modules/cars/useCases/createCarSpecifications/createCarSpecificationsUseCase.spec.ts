import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationsUseCase } from "./createCarSpecificationsUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;

let car;
let specification;

describe("Create Car Specificarions", () => {
  beforeAll(async () => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepository,
      specificationsRepository
    );

    car = await carsRepository.create({
      name: "example name",
      description: "example description",
      license_plate: "ABC-1234",
      brand: "Fiat",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "string",
    });

    specification = await specificationsRepository.create({
      name: "specification 1",
      description: "description",
    });
  });

  it("Should be able to add specifications to a car", async () => {
    const carUpdated = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    expect(carUpdated).toHaveProperty("specifications", [specification]);
  });

  it("Should not be able to add specifications to a car that doesn't exist", () => {
    expect(
      createCarSpecificationsUseCase.execute({
        car_id: "falseCarId",
        specifications_ids: ["falseSpecificationId"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to add specifications that doesn't exist to a car", () => {
    expect(
      createCarSpecificationsUseCase.execute({
        car_id: car.id,
        specifications_ids: ["falseSpecificationId"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
