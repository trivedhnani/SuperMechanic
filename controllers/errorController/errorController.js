const AppError = require("../../utils/appError");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  if (process.env.NODE_ENV === "development") sendErrorDev(err, req, res);
  else sendErrorProd(err, req, res);
};
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
  });
};
