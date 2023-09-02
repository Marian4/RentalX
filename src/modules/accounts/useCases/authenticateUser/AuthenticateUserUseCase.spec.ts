import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
const userData = {
  name: "user_test",
  email: "test@email.com",
  password: "pass123test",
  driver_license: "0192098",
};

describe("Authenticate an user", () => {
  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    await createUserUseCase.execute(userData);

    const result = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an user if the password is incorrect", async () => {
    expect(
      authenticateUserUseCase.execute({
        email: userData.email,
        password: "wrongpass",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an user if the user does not exist", async () => {
    expect(
      authenticateUserUseCase.execute({
        email: "idontexist",
        password: "wrongpass",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
