const { Server } = require("socket.io");
const Message = require("../models/message");
const Conversation = require("../models/conversation"); // Importa el modelo de conversación si es necesario

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Escuchar cuando un usuario se une a una conversación específica
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId); // El socket se une a la sala específica de la conversación
      console.log(`User joined conversation ${conversationId}`);
    });

    // Recibir mensajes de los clientes
    socket.on("message", async (msg) => {
      console.log("Message received:", msg);
      const { conversationId, senderId, content } = msg;

      try {
        const newMessage = new Message({
          conversationId,
          senderId,
          content,
        });
        await newMessage.save();

        // Emitir el mensaje a todos los sockets que están en la misma conversación
        io.to(conversationId).emit("message", newMessage);
      } catch (error) {
        console.error("Error saving message to the database:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = configureSocket;
