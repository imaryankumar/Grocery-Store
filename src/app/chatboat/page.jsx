"use client";
import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
const ChatBoat = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [sendMessage, setSendMessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server`);
    });
    socket.on("message2", (msg) => {
      console.log("My Data is :", msg);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const onMessageSendHandler = (e) => {
    e.preventDefault();
    console.log(sendMessage);
    socket.emit("Hello", sendMessage);
    setSendMessage("");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[50%] h-[80%] border rounded relative">
        <form
          className="absolute bottom-0 left-0 right-0 text-center"
          onSubmit={onMessageSendHandler}>
          <input
            type="text"
            placeholder="Please Start Chat.."
            className="w-full h-full border py-2 px-4 outline-none"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatBoat;
