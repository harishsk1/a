// cors.middleware.ts
import cors from "cors";

const corsOptions = {
  origin:
    process.env.CORS_ORIGIN === "*"
      ? "*" // Allow all origins
      : process.env.CORS_ORIGIN?.split(","), // Allow specific origins
  credentials: true, // Include credentials
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
