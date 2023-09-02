import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let category: Category;

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("Should be able to create a category", async () => {
    category = await createCategoryUseCase.execute({
      name: "test",
      description: "this is a test",
    });

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a category with a repeated name", async () => {
    expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: "repeating a category",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
