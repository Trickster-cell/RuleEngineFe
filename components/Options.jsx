import React from "react";
import { useNavigate } from "react-router-dom";

const Arrow = () => {
  return (
    <svg
      className="w-6 h-6
     text-gray-800 dark:text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round" // corrected to camelCase
        strokeLinejoin="round" // corrected to camelCase
        strokeWidth="2" // corrected to camelCase
        d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
      />
    </svg>
  );
};

const Options = () => {
  const navigate = useNavigate();

  const handleCreateRule = () => {
    navigate("/createRule");
  };

  const handleAvailableRules = () => {
    navigate("/availableRules");
  };

  const handleEvaluate = () => {
    navigate("/evaluate");
  };

  const handleCombine = () => {
    navigate("/combine");
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      <div
        className="container
        cursor-pointer 
        text-gray-900 
        bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleCreateRule}
      >
        Create Rule
        <Arrow />
      </div>
      <div
        className="container 
        cursor-pointer 
      text-gray-900 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleAvailableRules}
      >
        Available Rules
        <Arrow />
      </div>
      <div
        className="container 
        cursor-pointer 
      text-gray-900 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleCombine}
      >
        Combine Rules
        <Arrow />
      </div>
      <div
        className="container 
        cursor-pointer 
      text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleEvaluate}
      >
        Evaluate Data
        <Arrow />
      </div>
    </div>
  );
};

export default Options;
