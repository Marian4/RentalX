import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureUserisAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "aa01fe069d11f4a6af82b67ca02c7450"
    ) as IPayload;
    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) throw new Error("User does not exist");

    next();
  } catch {
    throw new Error("Invalid token");
  }
}
