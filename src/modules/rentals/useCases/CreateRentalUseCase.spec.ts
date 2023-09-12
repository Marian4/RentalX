import dayjs from "dayjs";

import { AppError } from "../../../errors/AppError";
import { DayJsDateProvider } from "../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsDateProvider;
const rentalData = {
  user_id: "1111",
  car_id: "2222",
  expected_return_date: dayjs().add(24, "hours").toDate(),
};

describe("Create Rental", () => {
  beforeAll(() => {
    console.log(typeof rentalData.expected_return_date);
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider
    );
  });

  it("Should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental with unavailable car", async () => {
    expect(
      createRentalUseCase.execute({ ...rentalData, user_id: "1010" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rental if the user has an open rental", async () => {
    expect(
      createRentalUseCase.execute({ ...rentalData, car_id: "1010" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rental if the rental time is less than 1 day", async () => {
    expect(
      createRentalUseCase.execute({
        user_id: "5555",
        car_id: "6666",
        expected_return_date: dayjs().add(23, "hours").toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
