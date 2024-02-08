const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  User.signup(email, password)
    .then((data) => {
      const token = createToken(data._id);
      res.json({ email, token });
    })
    .catch((err) => {
      next(err);
    });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((data) => {
      const token = createToken(data._id);
      res.json({ email, token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { signupUser, loginUser };
