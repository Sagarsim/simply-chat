import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const sendMessage = async () => {
    if (message !== "" && message.trim() !== "") {
      const messageObj = {
        text: message,
        room: room,
        sender: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageObj);
      setMessageList((list) => [...list, messageObj]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
    socket.on("receive_typing", (typingUserData) => {
      console.log("typing: ", typingUserData);
      setTypingUser(typingUserData.sender);
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
      }, 2000);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="dot" />
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageData, i) => {
            return (
              <div
                key={i}
                className="message"
                id={username === messageData.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">{messageData.text}</div>
                  <div className="message-meta">
                    <p id="time">{messageData.time}</p>
                    <p id="author">{messageData.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        {showTyping && <p className="typing">{`${typingUser} is typing...`}</p>}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Enter message..."
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing", {
              room: room,
              sender: username,
            });
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button type="submit" onClick={sendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
