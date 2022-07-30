const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./Data/data');

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Chat app server.")
})

app.get("/api/chat", (req,res) => {
    console.log(chats);
    res.send(chats);
})

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))