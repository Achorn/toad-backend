const express = require("express");
const router = express.Router();
const Toad = require("../models/toadModel");

//GET all toads
router.get("/", (req, res) => {
  Toad.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err.message));
});

router.get("/:id", (req, res) => {
  Toad.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: err.message }));
});

router.post("/", (req, res) => {
  let toad = new Toad({ name: req.body.name });
  console.log(toad);
  toad
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.patch("/:id", (req, res) => {
  res.json({ greeting: "Hello from update toad route" });
});

router.delete("/:id", (req, res) => {
  res.json({ greeting: "Hello from delet a toad route" });
});

module.exports = router;
