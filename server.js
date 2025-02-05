const http = require("http");
const app = require("./src/app");
const config = require("./src/config/environment");
const logger = require("./src/utils/logger");
const connectDB = require("./src/config/database");

const PORT = config.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(config.MONGODB_URI);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
