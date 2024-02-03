import React from "react";
import Profiles from "../game/Profiles";
import Chat from "../game/Chat";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../game/Board";
import GameStats from "../game/GameStats";
import { useNavigate } from "react-router-dom";

const GamingPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { player } = useParams();
  const [messages, setMessages] = useState([]);
  const [gamePlayer, setGamePlayer] = useState(false);
  const socket = io("http://127.0.0.1:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
      socket.emit("create", [roomId, player]);
    });
    socket.on("redirect", () => {
      navigate(`/${roomId}/roomIsFull`);
    });
    console.log(gamePlayer);
    return () => {
      socket.emit("disconnect-user", [roomId, player]);
      socket.off("create");
      socket.off("connect");
      socket.off("redirect")
    };
  }, [socket]);

  return (
    <div className="bg-theme-color h-screen 0">
      <h1 className="text-2xl cursor-pointer text-blue-600 mx-auto text-center font-black  p-2 font-variety">
        Pictionary
      </h1>
      <div className="flex h-100 gap-4 h-5/6 mt-auto mx-2 font-normal">
        <div className="basis-2/12 flex flex-col">
          <Profiles
            class={
              "rounded basis-7/12 bg-shade flex-row p-2 overflow-hidden border"
            }
            socket={socket}
            roomId={roomId}
          />
          <GameStats
            socket={socket}
            roomId={roomId}
            setGamePlayer={setGamePlayer}
          />
        </div>
        <Board
          roomId={roomId}
          player={player}
          class={"basis-7/12  border rounded flex flex-col "}
          socket={socket}
          gamePlayer={gamePlayer}
        />
        <Chat
          class={"basis-3/12 bg-shade p-1 flex flex-col rounded border"}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          roomId={roomId}
        />
      </div>
    </div>
  );
};

export default GamingPage;
