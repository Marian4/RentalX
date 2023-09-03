import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

const dataExample = {
  name: "example name",
  description: "example description",
  license_plate: "ABC-1234",
  brand: "Fiat",
  daily_rate: 100,
  fine_amount: 50,
  category_id: "string",
};

describe("Create Car", () => {
  beforeAll(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a car and set it available", async () => {
    const car = await createCarUseCase.execute(dataExample);

    expect(car).toHaveProperty("id");
    expect(car).toHaveProperty("available", true);
  });

  it("Should not be able to create a car with repeated license_plate", async () => {
    expect(createCarUseCase.execute(dataExample)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
