const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const toadRoutes = require("./routes/toad");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const errorController = require("./controllers/errorController");
const createError = require("http-errors");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/toads", toadRoutes);
app.use("/api/user", userRoutes);

//how se setup error handling
app.get("/api/example", (req, res, next) => {
  // res.status(200).json({ greeting: "hello from example" });
  try {
    throw createError(404, "noway-hosay");
  } catch (error) {
    next(error);
  }
});

// Error Middleware
// app.use(errorController);
app.use((err, req, res, next) => {
  console.log("hit error middleware");
  console.log(err.status);
  res.status(err.status || 500);
  res.send({ message: err.message || "Something went wrong" });
  // res.statusText(err.message || "something went wrong");
  // res.json({
  //   error: {
  //     status: err.status || 500,
  //     message: err.message || "Something went wrong",
  //   },
  // });
});

const invalidPathHandler = (req, res, next) => {
  res.status(404).send({ message: "invalid path" });
};
app.use(invalidPathHandler);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//connect to db
connectDB().then(() => {
  const listener = app.listen(process.env.PORT || 4000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
