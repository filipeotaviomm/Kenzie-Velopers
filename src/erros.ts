import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);
  return res.status(500).json({
    message: "Internal server error.",
    errorMessage: error.message,
    errorName: error.name,
  });
};
