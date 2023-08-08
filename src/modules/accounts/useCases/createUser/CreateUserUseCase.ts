import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDto): Promise<void> {
    const { email, password } = data;
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError("Email already have been used before");

    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserUseCase };
