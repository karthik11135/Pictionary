import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const LandingForm = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <form class="max-w-md mx-auto bg-slate-200 rounded-lg my-4 border-2 py-4 px-5 font-normal">
      <h2 className="font-medium text-lg tracking-wide mb-4 text-center">
        Enter the game
      </h2>
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full font-bold text-sm text-blue-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full font-bold text-sm text-blue-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          required
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Room ID
        </label>
      </div>
      <Link
        type="submit"
        to = {'/room/' + roomId}
        class="text-blue-600 font-bold border-blue-200 focus:ring-4 focus:outline-none  bg-none  border-2 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2 text-center dark:bg-none"
      >
        Let's Play
      </Link>
    </form>
  );
};

export default LandingForm;
