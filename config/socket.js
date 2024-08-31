const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("message", (msg) => {
      console.log("Message received:", msg);

      // // emitir un evento de vuelta al cliente
      // io.emit("message", `Mensaje del servidor: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = configureSocket;
