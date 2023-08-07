import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDto): Promise<User> {
    const { email, password } = data;
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new Error("Email already have been used before");

    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserUseCase };
