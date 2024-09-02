const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");

const createConversation = asyncHandler(async (req, res) => {
  const { userId, businessId } = req.body;

  if (!userId || !businessId) {
    return res
      .status(400)
      .json({ message: "userId y businessId son requeridos." });
  }

  try {
    const existingConversation = await Conversation.findOne({
      user: userId,
      business: businessId,
    });

    if (existingConversation) {
      return res.status(200).json({
        message: "Conversación ya existe.",
        conversation: existingConversation,
      });
    }

    const newConversation = new Conversation({
      user: userId,
      business: businessId,
    });

    const savedConversation = await newConversation.save();

    res.status(201).json({
      success: true,
      msg: "Conversación creada exitosamente.",
      conversation: savedConversation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la conversación.",
      error: error.message,
    });
  }
});

module.exports = {
  createConversation,
};
