process.on("uncaughtException", (err) => {
  console.log(err.name + "," + err.message);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection succcessful");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name + "," + err.message);
  console.log("Shutting Down the server");
  server.close(() => {
    process.exit(1);
  });
});
