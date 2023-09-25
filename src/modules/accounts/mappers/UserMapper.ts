import { instanceToInstance } from "class-transformer";

import { User } from "../entities/User";

interface IUserProfile {
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  avatar_url(): string;
}

class UserMapper {
  static toDTO({
    name,
    email,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserProfile {
    const profile = instanceToInstance({
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    });

    return profile;
  }
}

export { UserMapper, IUserProfile };
