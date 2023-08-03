import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories: IImportCategory[] = await this.loadCategories(file);
    categories.forEach((category) => {
      const categoryAlreadyExists = this.categoriesRepository.findByName(
        category.name
      );
      if (!categoryAlreadyExists) this.categoriesRepository.create(category);
    });
  }
}

export { ImportCategoriesUseCase };
