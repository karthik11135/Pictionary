import React from "react";
import { useState } from "react";
import LandingForm from "../form/LandingForm";
import "../../src/App.css";

const LandingPage = () => {
  return (
    <div className=" bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-sky-500 to-sky-500 h-screen w-screen">
      <h1 className="text-4xl text-theme-color mb-40  mx-auto text-center font-black p-2 font-variety ">
        Pictionary
      </h1>
      <LandingForm />
      <div className="text-yellow-600 text-red-600 hidden text-purple-600 text-green-600"></div>

    </div>
  );
};

export default LandingPage;
