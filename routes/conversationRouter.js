const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversationController");

router.post("/", ConversationController.createConversation);

module.exports = router;
