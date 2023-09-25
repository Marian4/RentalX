import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUserProfile, UserMapper } from "../../mappers/UserMapper";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDto): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((item) => item.id === user.id);
    this.users[index] = user;
  }

  async getProfile(id: string): Promise<IUserProfile> {
    const user = this.users.find((user) => user.id === id);

    return UserMapper.toDTO(user);
  }
}

export { UsersRepositoryInMemory };
