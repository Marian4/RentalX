import { inject, injectable } from "tsyringe";

import { IUserProfile } from "../../mappers/UserMapper";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserProfile> {
    const userProfile = await this.usersRepository.getProfile(id);

    return userProfile;
  }
}

export { GetUserProfileUseCase };
