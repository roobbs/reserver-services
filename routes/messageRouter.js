const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");

router.post("/", MessageController.sendMessage); // Envía un nuevo mensaje
router.get("/", MessageController.getAllMessages); // Obtiene todos los mensajes
router.get("/:messageId", MessageController.getMessageById); // Obtiene un mensaje por su ID
router.put("/:messageId", MessageController.updateMessage); // Actualiza un mensaje por su ID
router.delete("/:messageId", MessageController.deleteMessage); // Elimina un mensaje por su ID

module.exports = router;
