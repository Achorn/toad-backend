const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //get token req
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }

  const token = authorization.split(" ")[1];
  // get user id from token
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log("got id: ", _id);

    req.user = await User.findOne({ _id }).select("_id");
    console.log("got User:", req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
