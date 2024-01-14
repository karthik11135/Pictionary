import React from "react";
import Profiles from "../game/Profiles";
import WhiteBoard from "../game/WhiteBoard";
import Chat from "../game/Chat";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const GamingPage = () => {
  const [messages, setMessages] = useState([]);
   
  const socket = io("http://127.0.0.1:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // x8WIv7-mJelg7on_ALbx
    });
    console.log('ran');
    // socket.emit("chat", messages[0]);
  }, [socket]);

  return (
    <div className="border-2 bg-theme-color h-screen">
      <h1 className="text-2xl text-blue-600 mx-auto text-center font-black border-2 p-2 font-variety mb-10 ">
        Pictionary
      </h1>
      <div className="flex h-100 gap-4 h-5/6 mt-auto mx-2 font-normal ">
        <Profiles
          class={
            "basis-2/12  rounded bg-shade flex-row p-2 overflow-hidden border"
          }
        />
        <WhiteBoard class={"basis-7/12 rounded flex flex-col border "} />
        <Chat
          class={"basis-3/12 bg-shade p-1 flex flex-col rounded border h-3/4"}
          messages={messages}
          setMessages={setMessages}
          socket = {socket}
        />
      </div>
    </div>
  );
};

export default GamingPage;
