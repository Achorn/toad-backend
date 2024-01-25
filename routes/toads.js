const express = require("express");

const router = express.Router();

//GET all toads
router.get("/", (req, res) => {
  res.json({ greeting: "Hello from get all toads route" });
});

router.get("/:id", (req, res) => {
  res.json({ greeting: "Hello from get one toad route" });
});

router.post("/", (req, res) => {
  res.json({ greeting: "Hello from POST a toad route" });
});

router.patch("/:id", (req, res) => {
  res.json({ greeting: "Hello from update toad route" });
});

router.delete("/:id", (req, res) => {
  res.json({ greeting: "Hello from delet a toad route" });
});

module.exports = router;
