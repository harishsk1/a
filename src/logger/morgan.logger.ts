import morgan, { StreamOptions } from "morgan";
import logger from "./winston.logger";

// Define the stream object with a 'write' function that uses the HTTP severity
const stream: StreamOptions = {
  write: (message: string) => logger.http(message.trim()),
};

// Define the skip function to determine if logging should be skipped
const skip = (): boolean => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
