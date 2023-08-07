import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<User> {
    const user = this.repository.create(data);
    const createdUser = await this.repository.save(user);

    return createdUser;
  }
}

export { UsersRepository };
