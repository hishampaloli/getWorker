import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/employeeActions";
import "./header.css";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  console.log(user?.userInfo?.userType);

  const handleLogout = () => {
    console.log(3434);
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <div className="left">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <h2>GETWORKER</h2>
          </Link>
        </div>

        {user?.userInfo?._id ? (
          <div className="right">
          <Link >Find talents</Link>
            <Dropdown>
              <Dropdown.Toggle
                className="btn"
                style={{backgroundColor: 'transparent', color: ' #3CCF4E'}}
                variant="success"
                id="dropdown-basic"
              >
                {user?.userInfo?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="right">
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
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
