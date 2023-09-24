import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/providers/MailProvider/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

@injectable()
class SendForgotPassMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("User does not exist");

    const { refresh_token: token } = await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: uuidV4(),
      expires_in: this.dateProvider.addHoursToNow(3),
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPass.hbs"
    );

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      templatePath,
      {
        name: user.name,
        link: `${process.env.RESET_PASS_URL}${token}`,
      }
    );
  }
}

export { SendForgotPassMailUseCase };
