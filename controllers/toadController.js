const Toad = require("../models/toadModel");
const mongoose = require("mongoose");

const createToad = async (req, res) => {
  const user_id = req.user.id;
  let toad = new Toad({ name: req.body.name, user_id });
  toad
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const getToad = async (req, res) => {
  user_id = req.user._id;
  Toad.findOne({ user_id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err.message));
};

const getToadById = async (req, res) => {
  Toad.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: err.message }));
};

const updateToad = async (req, res) => {
  const { id } = req.params;

  // TODO: cancel if toads user_id doesnt match up with user making request

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Toad" });
  }

  Toad.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((toad) => {
      if (!toad) res.status(400).json({ error: "No such toad" });
      res.json(toad);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const deleteToad = async (req, res) => {
  const { id } = req.params;
  // TODO: cancel if toads user_id doesnt match up with user making request

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
  getToads: getToad,
  getToad: getToadById,
  createToad,
  deleteToad,
  updateToad,
};
