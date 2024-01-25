const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const toadRoutes = require("./routes/toads.js");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/toads", toadRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
  const listener = app.listen(process.env.PORT || 4000, () => {
    console.log(
      "Your app connected to db & is listening on port " +
        listener.address().port
    );
  });
});
