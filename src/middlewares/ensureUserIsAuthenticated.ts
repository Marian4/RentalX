import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";
import { AppError } from "../errors/AppError";
import { UsersTokenRepository } from "../modules/accounts/repositories/implementations/UsersTokenRepository";

interface IPayload {
  sub: string;
}

export async function ensureUserisAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const usersTokenRepository = new UsersTokenRepository();
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user_token = await usersTokenRepository.findByUserAndRefreshToken(
      user_id,
      token
    );

    if (!user_token) throw new AppError("Token does not exist in database");

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
