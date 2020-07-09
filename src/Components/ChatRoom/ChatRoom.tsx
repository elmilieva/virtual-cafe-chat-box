import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const SOCKET_IO_URL = "http://localhost:9000/";
const socket = io(SOCKET_IO_URL);
function ChatRoom() {
  const [initialized, setInitialized] = useState(false);
  const handleSubmit = async (e: any) => {
    const data = '{"user": "eliza", "message": "hello"}';
    socket.emit("chat message", JSON.parse(data));
  };
  const connectToRoom = () => {
    socket.on("chat message", (data: {}) => {
      console.log(data);
    });
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) {
      connectToRoom();

      return () => {
        socket.disconnect();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div onClick={handleSubmit}>Send Message</div>;
}
export default ChatRoom;
