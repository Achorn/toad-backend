const express = require("express");
const {
  getToads,
  getToad,
  createToad,
  deleteToad,
  updateToad,
} = require("../controllers/toadController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all toad routes
router.use(requireAuth);

router.post("/", createToad);

router.get("/", getToads);

router.get("/:id", getToad);

router.patch("/:id", updateToad);

router.delete("/:id", deleteToad);

module.exports = router;
