const Toad = require("../models/toadModel");
const mongoose = require("mongoose");

const createToad = async (req, res) => {
  let toad = new Toad({ name: req.body.name });
  toad
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const getToads = async (req, res) => {
  Toad.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err.message));
};

const getToad = async (req, res) => {
  Toad.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: err.message }));
};

const updateToad = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  Toad.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((toad) => {
      if (!toad) res.status(400).json({ error: "No such toad" });
      //returns pre updated toad
      res.json(toad);
    })
    .catch((err) => res.json({ error: err.message }));
};

const deleteToad = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such toad" });
  }
  Toad.findOneAndDelete({ _id: id })
    .then((toad) => {
      if (!toad) return res.status(404).json({ error: "No such toad" });
      res.status(200).json(toad);
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = {
  getToads,
  getToad,
  createToad,
  deleteToad,
  updateToad,
};
