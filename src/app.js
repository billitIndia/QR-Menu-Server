const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Configure CORS to allow any frontend
app.use(
  cors({
    origin: "*", // Allows requests from any origin
    credentials: true, // Enables credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all common HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
