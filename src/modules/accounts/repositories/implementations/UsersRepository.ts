import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUserProfile, UserMapper } from "../../mappers/UserMapper";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<void> {
    const user = this.repository.create(data);
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async getProfile(id: string): Promise<IUserProfile> {
    const user = await this.repository.findOne({ where: { id } });

    return UserMapper.toDTO(user);
  }
}

export { UsersRepository };
