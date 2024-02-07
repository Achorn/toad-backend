module.exports = (err, req, res, next) => {
  console.log("congrats you hit the error middleware");
  res.status(500).send("An unknown error occured");
};
