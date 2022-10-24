import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blockUser, getAllEmplyers } from "../../../actions/adminActions";
import Alert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const AllEmployers = () => {
  const dispatch = useDispatch();

  const Employers = useSelector((state) => state.allEmployers);
  const [keyword, setKeyword] = useState("");
  const [alert, setAlert] = useState(false);


  useEffect(() => {
    dispatch(getAllEmplyers(keyword));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllEmplyers(keyword));
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
        {Employers?.data ? (
          Employers?.data?.map((dt) => {
            return (
              <div key={dt?._id} className="talent-result">
                <div className="t-left">
                  <img
                    src={
                      dt?.employerData?.image
                        ? dt?.employerData?.image
                        : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    }
                    alt=""
                  />
                  <div>
                    <p style={{ color: "#3ccf4e" }}>{dt?.name}</p>
                    {/* <h4>{dt?.userTitle.slice(0, 20)}. . .</h4> */}
                    <p>
                      total Spend:{" "}
                      <strong> ₹{dt?.employerData?.totalSpend}</strong>
                    </p>
                  </div>
                </div>

                <div className="t-right">
                  {dt?.isBlocked ? (
                    <button
                      style={{
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
                    <Link to={`/employer/publicView/${dt?._id}`}>
                      {" "}
                      <VisibilityIcon style={{ color: "white" }} />{" "}
                    </Link>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{display: 'flex', justifyContent: 'center'}} >
        
              <CustomSpinner />
            
          </div>
        )}

        {Employers?.data?.length > 0 ? '': <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} ><img style={{width: '300px', height: '300px'}} src="https://static.vecteezy.com/system/resources/previews/005/073/071/original/user-not-found-account-not-register-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="" /></div>  }
      </div>
    </div>
  );
};

export default AllEmployers;
