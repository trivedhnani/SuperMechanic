const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user/user.routes");
const globalErrorHandler = require("./controllers/errorController/errorController");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/user", userRouter);
app.use(globalErrorHandler);
module.exports = app;
