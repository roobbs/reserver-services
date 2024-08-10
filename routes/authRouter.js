const express = require("express");
const passport = require("passport");
const router = express.Router();
const { issueJwt } = require("../utils/issueJwt");
const ServiceProvider = require("../models/serviceProvider");
const asyncHandler = require("express-async-handler");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// asyncHandler(async (req, res) => {
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(async (req, res, next) => {
    console.log("entrando");
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      const jwt = issueJwt(req.user);

      const businessResponse = await ServiceProvider.findOne({
        userId: req.user._id,
      }).populate("servicesOffered");

      const business = businessResponse ? businessResponse : null;

      const businessesList = await ServiceProvider.find({
        userId: { $ne: req.user._id },
      }).populate("servicesOffered");

      res.redirect(
        `http://localhost:5173/auth?token=${jwt.token}&expiresIn=${
          jwt.expires
        }&user=${JSON.stringify(req.user)}&business=${JSON.stringify(
          business
        )}&businessesList=${JSON.stringify(businessesList)}`
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;
