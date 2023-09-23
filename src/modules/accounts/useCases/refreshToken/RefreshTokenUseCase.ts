import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_token =
      await this.usersTokenRepository.findByUserAndRefreshToken(sub, token);

    if (!user_token) throw new AppError("Token does not exist in database");

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokenRepository.deleteById(user_token.id);

    await this.usersTokenRepository.create({
      user_id: sub,
      refresh_token,
      expires_in: this.dateProvider.addDaysToNow(
        auth.expires_in_refresh_token_days
      ),
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
