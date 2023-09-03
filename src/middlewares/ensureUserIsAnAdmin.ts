import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureUserisAnAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const usersRepository = new UsersRepository();
  const { id } = request.user;

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) throw new AppError("Only admins allowed", 401);

  next();
}
