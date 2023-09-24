import { UserToken } from "../entities/UserToken";

interface ICreateUserTokenDto {
  user_id: string;
  refresh_token: string;
  expires_in: Date;
}

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDto): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
}

export { IUsersTokenRepository, ICreateUserTokenDto };
