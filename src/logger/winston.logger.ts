import winston, {
  Logger,
  transports,
  format,
  addColors,
  LoggerOptions,
} from "winston";

// Define severity levels
const levels: winston.config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Determine the current environment
const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

// Set the current severity level based on the environment
const level = isDevelopment ? "debug" : "warn";

// Define colors for each severity level
const colors: winston.config.AbstractConfigSetColors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

// Link the colors to the severity levels
addColors(colors);

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
  format.colorize({ all: true }),
  format.printf(
    ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
  )
);

// Define the transports for logging
const logTransports: winston.transport[] = [
  new transports.Console(),
  new transports.File({ filename: "logs/error.log", level: "error" }),
  new transports.File({ filename: "logs/info.log", level: "info" }),
  new transports.File({ filename: "logs/http.log", level: "http" }),
];

// Create the logger instance
const logger: Logger = winston.createLogger({
  level,
  levels,
  format: logFormat,
  transports: logTransports,
});

export default logger;
