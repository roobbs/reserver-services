var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("welcome to RESERVER SERVICES API");
});

module.exports = router;
