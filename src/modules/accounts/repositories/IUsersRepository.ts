import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";
import { IUserProfile } from "../mappers/UserMapper";

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: User): Promise<void>;
  getProfile(id: string): Promise<IUserProfile>;
}

export { IUsersRepository };
