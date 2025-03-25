import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an asynchronous request handler, ensuring that any errors are
 * passed to the next middleware in the chain.
 *
 * @param requestHandler - An asynchronous function that handles the request and response.
 * @returns A function that executes the requestHandler and catches any errors, passing them to the next function.
 */

const asyncHandler = (
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
