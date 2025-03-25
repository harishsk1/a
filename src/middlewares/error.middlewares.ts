import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "pg"; // Import DatabaseError from pg
import logger from "../logger/winston.logger";
import { ApiError } from "../utils/ApiError";

/**
 * Error-handling middleware for Express applications.
 * Catches errors from request handlers wrapped inside asyncHandler.
 *
 * @param err - The error object.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
const errorHandler = (
  err: Error | ApiError | DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let error = err;

  // Check if the error is an instance of ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error instanceof DatabaseError ? 500 : 400;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  // Construct the response object
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  // Log the error message
  logger.error(error.message);

  // Send the error response
  return res.status(error.statusCode).json(response);
};

export { errorHandler };
