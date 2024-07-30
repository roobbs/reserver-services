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
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      const jwt = issueJwt(req.user);

      // res.status(201).json({
      //   success: true,
      //   msg: "User logged in successfully with Google",
      //   user: req.user,
      //   token: jwt.token,
      //   expiresIn: jwt.expires,
      // });

      res.redirect(
        `http://localhost:5173/auth?token=${jwt.token}&expiresIn=${jwt.expires}&user=${req.user}`
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
