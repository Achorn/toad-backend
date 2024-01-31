const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  User.signup(email, password)
    .then((data) => {
      const token = createToken(data._id);
      res.json({ email, token });
    })
    .catch((err) => res.json({ error: err.message }));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.json({ msg: "hello from login" });
};

module.exports = { signupUser, loginUser };
