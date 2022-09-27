import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/employeeActions";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  console.log(user);
 
  const handleLogout = () => {
    console.log(3434);
    dispatch(logout());
  }

  return (
    <div>
      <header>
        <div className="left">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <h2>GETWORKER</h2>
          </Link>
        </div>

      {user?.userInfo?._id ?   <div className="right">
        
          <button onClick={handleLogout} className="btn-2">
              Logout
          </button>
        </div> :   <div className="right">
          <button className="btn-1">
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/signup"
            >
              SignUp
            </Link>
          </button>
          <button className="btn-2">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/login"
            >
              Login
            </Link>
          </button>
        </div>}
      </header>
    </div>
  );
};

export default Header;
