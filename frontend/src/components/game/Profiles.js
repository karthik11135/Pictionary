import React from "react";

const Profiles = (props) => {
  const colors = ["purple", "yellow", "green", "blue", "red"];
  const players = ["karthik", "rahul", "sandeep", "emily", "racheal", "kenny"];

  return (
    <div className={props.class}>
      <h2 className="text-2xl mb-4 text-center font-variety text-blue-600 font-black ">
        Players
      </h2>
      <ul className="overflow-scroll h-full mb-2">
        {players.map((player, index) => {
          return (
            <li
              className={`p-2 bg-theme-color text-${
                colors[index % colors.length]
              }-600 mb-2 rounded`}
              key={index}
            >
              {player}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profiles;
