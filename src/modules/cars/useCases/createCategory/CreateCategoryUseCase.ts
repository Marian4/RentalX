import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    if (this.categoriesRepository.findByName(name)) {
      throw new Error("Category already exists");
    }

    return this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
