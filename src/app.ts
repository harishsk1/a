import express, { Application } from "express";
import cors from "cors";
import requestIp from "request-ip";
import morganMiddleware from "./logger/morgan.logger"; // HTTP request logger
import rateLimiter from "./middlewares/rateLimiter.middleware"; // Rate limiting
import { errorHandler } from "./middlewares/error.middlewares"; // Error handling
import healthcheckRouter from "./routes/healthcheck.routes"; // Health check routes

const app: Application = express();

// CORS configuration
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // Allow all origins
        : process.env.CORS_ORIGIN?.split(","), // Specific origins
    credentials: true, // Include credentials
  })
);

app.use(requestIp.mw()); // Client IP detection
app.use(rateLimiter); // Apply rate limiting
app.use(express.json({ limit: "16kb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files
app.use(morganMiddleware); // HTTP request logging

// API routes
app.use("/healthcheck", healthcheckRouter);

// Error handling middleware
app.use(errorHandler);

export { app };
