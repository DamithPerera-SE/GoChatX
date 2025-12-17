import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const joinChat = () => {
    const socket = new WebSocket(
      `ws://localhost:8080/ws?username=${username}`
    );

    socket.onmessage = (e) => {
      setMessages((prev) => [...prev, JSON.parse(e.data)]);
    };

    setWs(socket);
    setJoined(true);
  };

  const sendMessage = () => {
    if (msg && ws) {
      ws.send(JSON.stringify({ content: msg }));
      setMsg("");
    }
  };

  if (!joined) {
    return (
      <div className="join">
        <h2>Join Chat</h2>
        <input
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={joinChat}>Join</button>
      </div>
    );
  }

  return (
    <div className="chat">
      <h2>GoChatX - Real-Time Chat</h2>
      <div className="box">
        {messages.map((m, i) => (
          <p key={i}>
            <b>[{m.timestamp}] {m.username}:</b> {m.content}
          </p>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
