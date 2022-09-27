import React from "react";
import "./landing.css";

const Landing = () => {

  return (
    <div className="landing-main" >
      <div className="left">
        <h1>GET THE BEST TALENTS ON GETWORKER</h1>
        <p>You can have the best people. Right here. Righ now</p>
        <button>GET STARTED</button>
      </div>

      <div className="right">
        <img src="https://media.istockphoto.com/vectors/group-of-young-business-people-working-together-in-modern-office-with-vector-id1212582438?k=20&m=1212582438&s=612x612&w=0&h=LCVmAwO4UVgKXQDujjRaDHyFGLhGBkHNvRf2en3hT8Q=" alt="" />
      </div>
    </div>
  );
};

export default Landing;
