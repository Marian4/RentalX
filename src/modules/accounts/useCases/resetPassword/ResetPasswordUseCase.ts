import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
  token: string;
  new_password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, new_password }: IRequest): Promise<void> {
    const user_token = await this.usersTokenRepository.findByRefreshToken(
      token
    );

    if (
      !user_token ||
      this.dateProvider.avaliateIfItsAPassedDate(user_token.expires_in)
    )
      throw new AppError("Invalid token");

    const user = await this.usersRepository.findById(user_token.user_id);
    const hashedPassword = await hash(new_password, 8);
    user.password = hashedPassword;
    await this.usersRepository.update(user);

    await this.usersTokenRepository.deleteById(user_token.id);
  }
}

export { ResetPasswordUseCase };
