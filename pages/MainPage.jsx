import React from "react";
import Heading from "../components/Heading";
import Options from "../components/Options";

const MainPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Heading />
      <Options/>
    </div>
  );
};

export default MainPage;
