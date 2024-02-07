const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const toadRoutes = require("./routes/toad");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const errorController = require("./controllers/errorController");

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

// Error Middleware
app.use(errorController);

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
