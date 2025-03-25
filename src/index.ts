import dotenv from "dotenv";
import { app } from "./app";
// import connectDB from "./db/index";
import logger from "./logger/winston.logger";

dotenv.config({ path: "./.env" });

const startServer = (): void => {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    logger.info(`📑 Visit the documentation at: http://localhost:${port}`);
    logger.info(`⚙️  Server is running on port: ${port}`);
  });
};

try {
  //   await connectDB();
  startServer();
} catch (err) {
  logger.error("DB connect error: ", err);
  process.exit(1); // Exit the process with failure
}
