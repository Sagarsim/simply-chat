import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const getChats = async () => {
        const {data} = await axios.get("/api/chat");
        setChats(data);
    }

    useEffect(() => {
        getChats();
    })

    return <div>{chats.map(chat => <div key={chat._id}>{chat.chatName}</div>)}</div>
}

export default ChatPage;