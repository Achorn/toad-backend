const User = require("../models/userModel");

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.signup(email, password)
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: err.message }));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.json({ msg: "hello from login" });
};

module.exports = { signupUser, loginUser };
