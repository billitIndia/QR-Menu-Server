const AppError = require("../utils/AppError");

const handleError = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging in non-production environments
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  // Handle specific error types
  if (err.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  } else if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new AppError(messages.join(". "), 400);
  } else if (err.code === 11000) {
    error = new AppError("Duplicate field value entered", 400);
  }

  // Send error response
  res.status(error.statusCode || 500).json({
    status: "error",
    message: error.message || "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = handleError;
