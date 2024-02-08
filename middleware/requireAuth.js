const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createError = require("http-errors");

const requireAuth = async (req, res, next) => {
  //get token req
  const { authorization } = req.headers;
  if (!authorization) {
    const err = createError(401, "Authorization required");
    return next(err);
  }
  const token = authorization.split(" ")[1];

  // get user id from token
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    const err = createError(401, "Request is not authorized");
    next(err);
  }
};

module.exports = requireAuth;
