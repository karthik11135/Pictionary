import React from "react";
import { useState } from "react";
import LandingForm from "../form/LandingForm";

const LandingPage = () => {
  return (
    <div className="border-2 bg-theme-color h-screen">
      <h1 className="text-2xl text-blue-600 mx-auto text-center font-black border-2 p-2 font-variety mb-10 ">
        Pictionary
      </h1>
      <LandingForm />
      <div className="text-yellow-600 text-red-600 hidden text-purple-600 text-green-600"></div>
    </div>
  );
};

export default LandingPage;
