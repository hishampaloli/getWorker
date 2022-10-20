import React from "react";
import CustomSpinner from "../customSpinner/CustomSpinner";
import './LoadingPage.css'

const LoadingPage = () => {
  return (
    <div
      style={{ width: "100%", height: "100vh", backgroundColor: " #1d4354", alignItems :'center', justifyContent: 'center', display: 'flex' }}
    >
     <div className="kineti"></div>
    </div>
  );
};

export default LoadingPage;
