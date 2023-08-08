import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ message: `Internal Server Error - ${err.message}` });
}

export { errorMiddleware };
