const Toad = require("../models/toadModel");
const mongoose = require("mongoose");

const createToad = async (req, res) => {
  const user_id = req.user.id;
  let toad = new Toad({ name: req.body.name, user_id });
  toad
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const getToad = async (req, res) => {
  user_id = req.user._id;
  Toad.findOne({ user_id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const getToadById = async (req, res) => {
  Toad.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const updateToad = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ error: "No such Toad" });
    return;
  }
  Toad.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((toad) => {
      if (!toad) return res.status(400).send({ error: "No such toad" });
      res.json(toad);
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};

const deleteToad = async (req, res) => {
  const { id } = req.params;
  // TODO: cancel if toads user_id doesnt match up with user making request

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("No such toad");
  }
  Toad.findOneAndDelete({ _id: id })
    .then((toad) => {
      if (!toad) throw new Error("No such toad");
      res.status(200).json(toad);
    })
    .catch((err) => {
      console.log("caught error?");
      res.status(400).send({ error: err.message });
    });
};

module.exports = {
  getToads: getToad,
  getToad: getToadById,
  createToad,
  deleteToad,
  updateToad,
};
