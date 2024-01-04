const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chat app server.");
});

app.use("/v1/user", userRoutes);
app.use("/v1/chat", chatRoutes);
app.use("/v1/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Server started on port ${process.env.PORT}`)
);
