const mongoose = require("mongoose");
const validator = require("validator");
const userSchama = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be present"],
  },
  email: {
    type: String,
    required: [true, "Email must be present"],
  },
  password: {
    type: String,
    required: [true, "Password must be present"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password confirm must be present"],
  },
  passwordResetToken: String,
  passwordExpires: String,
  role: { type: String, enum: ["user", "mechanic", "admin"], default: "user" },
});
userSchama.pre("save", function (next) {
  // if
  next();
});
const UserModel = new mongoose.model("UserModel", userSchama);
module.exports = UserModel;
