const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversationController");

router.post("/", ConversationController.createConversation);
router.get(
  "/:conversationId/messages",
  ConversationController.getMessagesFromConversation
);

module.exports = router;
