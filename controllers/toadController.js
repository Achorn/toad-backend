const Toad = require("../models/toadModel");
const mongoose = require("mongoose");
const createError = require("http-errors");
const createToad = async (req, res, next) => {
  const user_id = req.user.id;
  let toad = new Toad({ name: req.body.name, user_id });
  toad
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

const getToad = async (req, res, next) => {
  user_id = req.user._id;
  Toad.findOne({ user_id })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

const getToadById = async (req, res, next) => {
  Toad.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

const updateToad = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(404, "No such Toad");
  }
  Toad.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((toad) => {
      if (!toad) throw createError(404, "No such toad");
      res.json(toad);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteToad = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(404, "No such toad");
  }
  Toad.findOneAndDelete({ _id: id })
    .then((toad) => {
      if (!toad) throw createError(404, "No such toad");
      res.status(200).json(toad);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getToads: getToad,
  getToad: getToadById,
  createToad,
  deleteToad,
  updateToad,
};
