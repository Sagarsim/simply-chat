const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New socket connection: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("New message: ", data);
  });
  socket.on("typing", (data) => {
    socket.to(data.room).emit("receive_typing", data);
  });
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});
server.listen(process.env.PORT, () => {
  console.log("Server running on port 3005");
});
