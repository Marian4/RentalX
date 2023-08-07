import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
