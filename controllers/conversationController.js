const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const createConversation = asyncHandler(async (req, res) => {
  const { userId, businessId } = req.body;

  if (!userId || !businessId) {
    return res
      .status(400)
      .json({ success: false, msg: "userId y businessId son requeridos." });
  }

  try {
    const existingConversation = await Conversation.findOne({
      user: userId,
      business: businessId,
    });

    if (existingConversation) {
      return res.status(200).json({
        success: false,
        message: "La conversación ya existe",
      });
    } else {
      const newConversation = new Conversation({
        user: userId,
        business: businessId,
      });

      await newConversation.save();

      const savedConversation = await Conversation.findById(
        newConversation._id
      ).populate("business", "name");

      res.status(201).json({
        success: true,
        msg: "Conversación creada exitosamente.",
        conversation: savedConversation,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la conversación.",
      error: error.message,
    });
  }
});

const getMessagesFromConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  if (!conversationId) {
    return res
      .status(400)
      .json({ message: "El ID de la conversación es requerido." });
  } else {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversación no encontrada." });
      }

      if (conversation) {
        const messages = await Message.find({ conversationId }).sort({
          createdAt: 1,
        });

        res.status(200).json({
          succes: true,
          msg: "Mensaes encontrados",
          messages: messages,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los mensajes de la conversación.",
        error: error,
      });
    }
  }
});

module.exports = {
  createConversation,
  getMessagesFromConversation,
};
