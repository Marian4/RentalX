import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
