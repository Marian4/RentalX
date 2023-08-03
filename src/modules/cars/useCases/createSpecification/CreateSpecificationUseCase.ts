import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationuseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);
    console.log(specificationAlreadyExists);
    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    return this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationuseCase };
