import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
const dataExample = {
  name: "test",
  description: "this is a test",
};

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("Should be able to create a category", async () => {
    const category = await createCategoryUseCase.execute(dataExample);

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a category with a repeated name", async () => {
    expect(createCategoryUseCase.execute(dataExample)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
