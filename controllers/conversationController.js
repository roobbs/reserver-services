const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");

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
    }

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
