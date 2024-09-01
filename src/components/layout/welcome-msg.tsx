import React from "react";

const WelcomeMsg = () => {
  return (
    <div className="space-y-2 mb-4">
      <h1 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome back{" "}
      </h1>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export default WelcomeMsg;
