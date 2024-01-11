import React from "react";

import Profiles from "../game/Profiles";
import WhiteBoard from "../game/WhiteBoard";
import Chat from "../game/Chat";
const GamingPage = () => {
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
        />
      </div>
    </div>
  );
};

export default GamingPage;
