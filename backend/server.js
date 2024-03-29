const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const rateLimiter = require("./middleware/rateLimit");
const path = require("path");

const app = express();

dotenv.config();
connectDB();

app.use(cors());

app.use(express.json());

app.use(rateLimiter);
app.use("/v1/user", userRoutes);
app.use("/v1/chat", chatRoutes);
app.use("/v1/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);
app.use(helmet());
app.disable("x-powered-by");

const server = app.listen(
  process.env.PORT,
  console.log(`Server started on port ${process.env.PORT}`)
);

const socketConfig = {
  pingTimeout: 60000,
  cors: {},
};

if (process.env.NODE_ENV !== "production")
  socketConfig.cors = { origin: "http://localhost:3000" };

const io = require("socket.io")(server, socketConfig);

io.on("connection", (socket) => {
  console.log("Socket connected");
  socket.on("setup", (userInfo) => {
    socket.join(userInfo._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users is undefined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", (userInfo) => {
    console.log("USER DISCONNECTED");
    socket.leave(userInfo._id);
  });
});
