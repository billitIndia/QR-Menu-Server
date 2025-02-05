class AppError extends Error {
  constructor(message, statusCode = 500, originalError = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.originalError = originalError;
  }
}

module.exports = AppError;
