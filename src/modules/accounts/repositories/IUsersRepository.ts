import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
