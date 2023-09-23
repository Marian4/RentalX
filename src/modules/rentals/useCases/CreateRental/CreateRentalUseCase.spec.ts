import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { DayJsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { Car } from "../../../cars/entities/Car";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsDateProvider;
const rentalData = {
  user_id: "1111",
  car_id: "",
  expected_return_date: dayjs().add(1, "day").toDate(),
};

let availableCar: Car;

describe("Create Rental", () => {
  beforeAll(async () => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );

    const car = await carsRepository.create({
      name: "example name",
      description: "example description",
      license_plate: "ABC-1234",
      brand: "Fiat",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "string",
    });

    availableCar = await carsRepository.create({
      name: "available test",
      description: "car available for test",
      license_plate: "DEF-1234",
      brand: "Fiat",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "string",
    });

    rentalData.car_id = car.id;
  });

  it("Should not be able to create a rental if the rental time is less than 1 day", async () => {
    await expect(
      createRentalUseCase.execute({
        ...rentalData,
        expected_return_date: dayjs().add(23, "hours").toDate(),
      })
    ).rejects.toEqual(new AppError("Rental time must be at least 1 day"));
  });

  it("Should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental with unavailable car", async () => {
    await expect(
      createRentalUseCase.execute({ ...rentalData, user_id: "1010" })
    ).rejects.toEqual(new AppError("Car unavailable"));
  });

  it("Should not be able to create a rental if the user has an open rental", async () => {
    await expect(
      createRentalUseCase.execute({ ...rentalData, car_id: availableCar.id })
    ).rejects.toEqual(new AppError("User already have a open rental"));
  });
});
