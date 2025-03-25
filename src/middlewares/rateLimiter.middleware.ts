import { Request, Response, NextFunction } from "express";
import { rateLimit, Options } from "express-rate-limit";
import requestIp from "request-ip";
import { ApiError } from "../utils/ApiError";

const limiterOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5000, // Limit each IP to 5000 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req: Request): string => {
    return requestIp.getClientIp(req) || ""; // Retrieve IP address from request
  },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    next(
      new ApiError(
        options.statusCode || 500,
        `Too many requests. You are allowed ${options.limit} requests per ${
          options.windowMs / 60000
        } minutes.`
      )
    );
  },
};

const rateLimiter = rateLimit(limiterOptions);

export default rateLimiter;
