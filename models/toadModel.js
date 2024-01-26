const mongoose = require("mongoose");

const toadSchema = mongoose.Schema({
  name: { type: String, required: true },
  last_feeding: { type: Date, default: new Date() },
  last_lesson: { type: Date, default: new Date() },
  last_activity: { type: Date, default: new Date() },
  education_points: { type: Number, default: 0 },
  water_points: { type: Number, default: 0 },
});

module.exports = mongoose.model("Toad", toadSchema);
