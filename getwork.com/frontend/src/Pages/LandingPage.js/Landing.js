import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user]);

  return (
    <div className="landing-main">
      <div className="left">
        <h1>GET THE BEST TALENTS ON GETWORKER</h1>
        <p>You can have the best people. Right here. Righ now</p>
        <button>GET STARTED</button>
      </div>

      <div className="right">
        <img
          src="https://media.istockphoto.com/vectors/group-of-young-business-people-working-together-in-modern-office-with-vector-id1212582438?k=20&m=1212582438&s=612x612&w=0&h=LCVmAwO4UVgKXQDujjRaDHyFGLhGBkHNvRf2en3hT8Q="
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
