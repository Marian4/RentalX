import { container } from "tsyringe";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../modules/accounts/repositories/IUsersRepository";
import { ICarsImagesRepository } from "../modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../modules/cars/repositories/ICategoriesRepository";
import { CarsImagesRepository } from "../modules/cars/repositories/implementations/CarsImagesRepository";
import { CarsRepository } from "../modules/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "../modules/rentals/repositories/implementations/RentalsRepository";
import { IRentalsRepository } from "../modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
