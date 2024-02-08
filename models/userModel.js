const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const createError = require("http-errors");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static signup method

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw createError(400, "All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw createError(400, "Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw CreateError(400, "Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw createError(400, "Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw createError(400, "All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw createError(400, "Email is not valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw createError(400, "Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(400, "Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
