const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const serviceProviderRouter = require("./serviceProviderRouter");
const serviceRouter = require("./serviceRouter");
const appointmentRouter = require("./appointmentRouter");
const messageRouter = require("./messageRouter");
const notificationRouter = require("./notificationRouter");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/provider", serviceProviderRouter);
router.use("/service", serviceRouter);
router.use("/appointment", appointmentRouter);
router.use("/message", messageRouter);
router.use("/notification", notificationRouter);

module.exports = router;
