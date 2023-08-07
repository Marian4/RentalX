import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<User>;
}

export { IUsersRepository };
