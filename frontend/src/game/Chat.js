import React, { useEffect } from "react";
import { useState } from "react";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("bg-blue-700")
  const [canMessage, setCanMessage] = useState(true)

  useEffect(() => {
    props.socket.on("game_started", () => {
      console.log("game_started");
      setCanMessage(true);
      setMessageStyle("bg-blue-700");
      setMessages((prev) => {
        return []
      })
    });
    props.socket.on("game_player", () => {
      console.log("gameplayer");
      setCanMessage(false);
      setMessages(prev => {
        return []
      })
    });
    return () => {
      props.socket.off("game_started");
      props.socket.off("game_player");
    };
  }, []);

  useEffect(() => {
    props.socket.on("chat", (message) => {
      console.log(message);
      setMessages((prev) => {
        return [message, ...prev];
      });
    });
    props.socket.on("word_is_correct", (data) => {
      setMessageStyle("bg-green-700")
    })
    return () => {
      props.socket.off("chat");
    };
  }, [props.socket]);

  const addMessage = (e) => {
    e.preventDefault();
    if (curMessage === "") return;
    props.socket.emit('guess_word', [curMessage, props.roomId])
    props.socket.emit("chat", [curMessage, props.roomId]);
    setCurMessage("");
  };

  return (
    <div className={props.class}>
      <h2 className="text-2xl mb-3 font-variety text-center text-blue-600 font-black">
        Chat
      </h2>
      <div className="flex flex-col h-5/6 flex-1">
        <ul className="overflow-scroll mb-2 flex flex-col-reverse grow max-h-full">
          {messages.map((message, index) => (
            <li
              className={`rounded m-0.5 text-sm border-theme-color ${messageStyle} px-1 text-green-300`}
              key={index}
            >
              {message}
            </li>
          ))}
        </ul>
    {canMessage && <form className="flex grow-0 align-bottom" onSubmit={addMessage}>
          <input
            type="Text"
            value={curMessage}
            onChange={(e) => {
              setCurMessage(e.target.value);
            }}
            placeholder="Type your answer"
            className="peer h-full w-full    bg-transparent bg-white px-1 py-2 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 "
          />
          <button className="bg-theme-color px-2 py-1 text-bluish">Send</button>
        </form>}
      </div>
    </div>
  );
};

export default Chat;
