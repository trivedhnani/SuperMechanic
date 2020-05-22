const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchama = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be present"],
  },
  email: {
    type: String,
    required: [true, "Email must be present"],
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Password must be present"],
    select: false,
  },
  photo: {
    type: String,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return this.password == value;
      },
      message: "Passwords are not same",
    },
  },
  passwordResetToken: String,
  passwordExpires: String,
  role: { type: String, enum: ["user", "mechanic", "admin"], default: "user" },
});
userSchama.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
const UserModel = new mongoose.model("UserModel", userSchama);
module.exports = UserModel;
