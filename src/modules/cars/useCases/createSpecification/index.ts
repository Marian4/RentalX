import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationuseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = SpecificationsRepository.getINSTANCE();
const createSpecificationUseCase = new CreateSpecificationuseCase(
  specificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
