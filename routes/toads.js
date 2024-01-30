const express = require("express");
const {
  getToads,
  getToad,
  createToad,
  deleteToad,
  updateToad,
} = require("../controllers/toadController");

const router = express.Router();

router.post("/", createToad);

router.get("/", getToads);

router.get("/:id", getToad);

router.patch("/:id", updateToad);

router.delete("/:id", deleteToad);

module.exports = router;
