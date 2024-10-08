const express = require("express");
const passport = require("passport");
const router = express.Router();
const { issueJwt } = require("../utils/issueJwt");
const asyncHandler = require("express-async-handler");
const ServiceProvider = require("../models/serviceProvider");
const Appointment = require("../models/appointment");
const Conversation = require("../models/conversation");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

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

      const appointmentList = await Appointment.find({
        userId: req.user._id,
      })
        .populate("providerId")
        .populate("serviceId");

      const business = businessResponse ? businessResponse : null;
      let businessConversations = null;
      if (business) {
        searchConversations = await Conversation.find({
          business: business._id,
        })
          .populate("business", "name")
          .populate("user", "first_name");
        businessConversations = searchConversations
          ? searchConversations
          : null;
      }

      const businessesList = await ServiceProvider.find({
        userId: { $ne: req.user._id },
      }).populate("servicesOffered");

      const conversationList = await Conversation.find({
        user: req.user._id,
      })
        .populate("business", "name")
        .populate("user", "first_name");

      res.redirect(
        `http://localhost:5173/auth?token=${jwt.token}&expiresIn=${
          jwt.expires
        }&user=${JSON.stringify(req.user)}&business=${JSON.stringify(
          business
        )}&businessesList=${JSON.stringify(
          businessesList
        )}&appointments=${JSON.stringify(
          appointmentList
        )}&conversations=${JSON.stringify(
          conversationList
        )}&businessConversations=${JSON.stringify(businessConversations)}`
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;
