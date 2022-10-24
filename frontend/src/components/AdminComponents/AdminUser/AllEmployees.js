import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blacklistUsers,
  blockUser,
  getAllEmplyees,
} from "../../../actions/adminActions";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const AllEmployees = () => {
  const dispatch = useDispatch();

  const Employees = useSelector((state) => state.allEmployees);
  const [keyword, setKeyword] = useState("");
  const [alert, setAlert] = useState(false);


  useEffect(() => {
    dispatch(getAllEmplyees(keyword));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllEmplyees(keyword));
  };
  return (
    <div>
      <div className="middle">
        {alert ? (
          <Alert
            style={{ position: "fixed", top: "30px", right: "50px" }}
            severity="warning"
          >
            Loading !
          </Alert>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="bottom">
        {Employees?.data ? (
          Employees?.data?.map((dt) => {
            return (
              <div key={dt?._id} className="talent-result">
                <div className="t-left">
                  <img
                    src={
                      dt?.employeeData?.image
                        ? dt?.employeeData?.image
                        : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    }
                    alt=""
                  />
                  <div>
                    <p style={{ color: "#3ccf4e" }}>{dt?.name}</p>
                    {/* <h4>{dt?.userTitle.slice(0, 20)}. . .</h4> */}
                    <p className="esr">
                      total earend: 
                      <strong> ₹{dt?.employeeData?.totalEarned?.toString().slice(0,3)}.00</strong>
                    </p>
                  </div>
                </div>

                <div className="t-right">
                  {/* <BookmarkBorderIcon
                            onClick={() => {
                              dispatch(saveTalents(dt?.owner?._id));
                              setAlret(true);
                              setTimeout(() => {
                                setAlret(false);
                              }, 1000);
                            }}
                            style={{ color: "#3ccf4e", cursor: "pointer" }}
                          /> */}

                  {dt?.isBlocked ? (
                    <button
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "#FF6262",
                        border: "none",
                        padding: "10px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      {" "}
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "white"
                        }}
                        onClick={(e) => {
                          dispatch(blockUser(dt?._id, keyword, dt?.userType));
                          setAlert(true);
                          setTimeout(() => {
                            setAlert(false);
                          }, 1500);
                        }}
                      >
                        {" "}
                        {dt?.isBlocked ? "unblock" : "block"}
                      </Link>
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#3ccf4e",
                        border: "none",
                        padding: "10px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      {" "}
                      <Link
                      style={{
                          textDecoration: "none",
                          color: "white"
                        }}
                        onClick={(e) => {
                          dispatch(blockUser(dt?._id, keyword, dt?.userType));
                          setAlert(true);
                          setTimeout(() => {
                            setAlert(false);
                          }, 1500);
                        }}
                      >
                        {" "}
                        {dt?.isBlocked ? "unblock" : "block"}
                      </Link>
                    </button>
                  )}

                  <button
                    style={{
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      backgroundColor: "#75E6FF",
                      border: "none",
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    <Link to={`/user/publicView/${dt?._id}`}>
                      {" "}
                      <VisibilityIcon style={{ color: "white" }} />{" "}
                    </Link>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CustomSpinner />
            </div>
          </div>
        )}

        {Employees?.data?.length > 0 ? (
          ""
        ) : (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              style={{ width: "300px", height: "300px" }}
              src="https://static.vecteezy.com/system/resources/previews/005/073/071/original/user-not-found-account-not-register-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEmployees;
