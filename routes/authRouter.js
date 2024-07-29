const express = require("express");
const passport = require("passport");
const router = express.Router();
const { issueJwt } = require("../utils/issueJwt");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // const jwtToken = issueJwt(req.user);
    // console.log(jwtToken);
    res.send("google has redirect you");
    // res.redirect(`http://localhost:3000?token=${jwtToken.token}`);
  }
);

module.exports = router;
