import React from "react";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-24 h-24 border-8 border-gray-300 border-t-black rounded-full animate-spin md:w-32 md:h-32"></div>
    </div>
  );
};

export default LoadingPage;

