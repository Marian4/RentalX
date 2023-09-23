import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { UserToken } from "../../entities/UserToken";
import {
  ICreateUserTokenDto,
  IUsersTokenRepository,
} from "../IUsersTokenRepository";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository("UserToken");
  }

  async create(data: ICreateUserTokenDto): Promise<void> {
    const user_token = this.repository.create(data);

    await this.repository.save(user_token);
  }

  async findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const user_token = await this.repository.findOne({
      where: { user_id, refresh_token },
    });

    return user_token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokenRepository };
