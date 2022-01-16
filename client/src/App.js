import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Room</h3>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter room ID"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <button type="submit" onClick={joinRoom}>
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={roomId} />
      )}
    </div>
  );
}

export default App;
