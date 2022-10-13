import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import {
  findTalents,
  getEmployerProfile,
  removeSavedTalent,
  saveTalents,
} from "../../../actions/EmployerActions";
import { Link } from "react-router-dom";
import "./FindTalent.scss";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";
import SettingsIcon from "@mui/icons-material/Settings";
import Close from "@mui/icons-material/Close";

const FindTalentsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const employerData = useSelector((state) => state.employerData);
  const talents = useSelector((state) => state.findTalents);

  const [keyword, setKeyword] = useState("");
  const [earnings, setEarnings] = useState("");
  const [language, setLanguage] = useState("");
  const [jobsDone, setJobsDone] = useState("");
  const [show, setShow] = useState(false);

  console.log(show);

  const [showSavedJobs, setShowSavedJobs] = useState("");
  const [alert, setAlret] = useState(false);
  const [alertR, setAlretR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false)
    dispatch(findTalents(keyword, earnings, language, jobsDone));
  };

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  });


  return (
    <div className="findTalents">
      {alert ? (
        <Alert className="save-alert" severity="success">
          Job saved
        </Alert>
      ) : (
        ""
      )}

      {alertR ? (
        <Alert className="save-alert" severity="success">
          Removing from saved jobs
        </Alert>
      ) : (
        ""
      )}
      <div className={show ? 'left show' : 'left'}>
      <CloseIcon onClick={() => setShow(!show)}  className="lef-close-icn" />
        <div className="main-cate-div">
          <p>Total Earned</p>
          <div className="cate-div">
            <label htmlFor=""> {"< 100"} </label>
            <input
              type="radio"
              name="sd"
              onChange={(e) => setEarnings(100)}
              id=""
            />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 200"} </label>
            <input
              type="radio"
              name="sd"
              onChange={(e) => setEarnings(200)}
              id=""
            />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 400"} </label>
            <input
              type="radio"
              name="sd"
              onChange={(e) => setEarnings(300)}
              id=""
            />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"< 800"} </label>
            <input
              type="radio"
              name="sd"
              onChange={(e) => setEarnings(400)}
              id=""
            />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"1000 +"} </label>
            <input
              type="radio"
              name="sd"
              onChange={(e) => setEarnings(10000)}
              id=""
            />
          </div>
        </div>

        <div className="main-cate-div">
          <p>Language</p>
          <div className="cate-div">
            <label htmlFor="">English</label>
            <input
              type="radio"
              name="lang"
              onChange={(e) => setLanguage("english")}
              id=""
            />
          </div>

          <div className="cate-div">
            <label htmlFor="">Hindi</label>
            <input
              type="radio"
              name="lang"
              onChange={(e) => setLanguage("hindi")}
              id=""
            />
          </div>

          <div className="cate-div">
            <label htmlFor="">Malayalam</label>
            <input
              type="radio"
              name="lang"
              onChange={(e) => setLanguage("malayalam")}
              id=""
            />
          </div>

          <div className="cate-div">
            <label htmlFor="">other</label>
            <input
              type="radio"
              name="lang"
              onChange={(e) => setLanguage("")}
              id=""
            />
          </div>
        </div>
        
        <button style={{backgroundColor: '#3CCF4E', color: 'white'}} onClick={handleSubmit} >Apply filter</button>
      </div>
      <div className="right">
        <div className="top">
          <button
            className={showSavedJobs === "" ? "btn" : "btn-k"}
            onClick={(e) => setShowSavedJobs("")}
          >
            Search <strong>{talents?.data?.length}</strong>
          </button>
          <button
            className={showSavedJobs === "saved" ? "btn" : "btn-k"}
            onClick={(e) => {
              dispatch(getEmployerProfile());
              setShowSavedJobs("saved");
            }}
          >
            Saved{" "}
            <strong className="count">
              {" "}
              {employerData?.userInfo?.savedTalents.length}
            </strong>
          </button>
          <button  className="set-icn" onClick={() => setShow(!show)}> <SettingsIcon  /></button>
         
        </div>

        {showSavedJobs === "" ? (
          <>
            <div className="middle">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search Talents based on Skills"
                />
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="bottom">
              {talents?.data ? (
                talents?.data?.map((talent) => {
                  return (
                    <div key={talent?.owner?._id} className="talent-result">
                      <div className="t-left">
                        <img
                          src={
                            talent?.image
                              ? talent?.image
                              : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                          }
                          alt=""
                        />
                        <div>
                          <p style={{ color: "#3ccf4e" }}>
                            {talent?.owner?.name}
                          </p>
                          <h4>{talent?.userTitle.slice(0, 20)}. . .</h4>
                          <p>
                            total earend:{" "}
                            <strong>
                              {talent?.totalEarned.toString().slice(0, 3)}.00
                            </strong>
                          </p>
                        </div>
                      </div>

                      <div className="t-right">
                        <BookmarkBorderIcon
                          onClick={() => {
                            dispatch(saveTalents(talent?.owner?._id));
                            setAlret(true);
                            setTimeout(() => {
                              setAlret(false);
                            }, 1000);
                          }}
                          style={{ color: "#3ccf4e", cursor: "pointer" }}
                        />
                        <button style={{ marginLeft: "20px" }}>
                          {" "}
                          <Link to={`/user/publicView/${talent?.owner._id}`}>
                            {" "}
                            View Profile
                          </Link>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {talents?.loading ? <CustomSpinner /> : ""}{" "}
                </div>
              )}
              {talents?.data?.length === 0 ? (
                <img
                  style={{ width: "300px", height: "300px" }}
                  src="https://static.vecteezy.com/system/resources/previews/005/073/071/original/user-not-found-account-not-register-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            {talents?.data ? (
              ""
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "200px" }}
                  src="https://img.freepik.com/free-vector/illustration-search-box_53876-37578.jpg?w=2000"
                  alt=""
                />
              </div>
            )}
          </>
        ) : (
          <div className="bottom">
            {employerData?.userInfo?.savedTalents ? (
              employerData?.userInfo?.savedTalents.map((talent) => {
                return (
                  <div key={talent?._id} className="talent-result">
                    <div className="t-left">
                      <img
                        src={
                          talent?.employeeData?.image
                            ? talent?.employeeData?.image
                            : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        }
                        alt=""
                      />
                      <div>
                        <p style={{ color: "#3ccf4e" }}>{talent?.name}</p>
                        <p>
                          total earned: <strong>{talent?.totalEarned}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="t-right">
                      <BookmarkRemoveIcon
                        onClick={() => {
                          dispatch(removeSavedTalent(talent?._id));
                          setAlretR(true);
                          setTimeout(() => {
                            setAlretR(false);
                          }, 1500);
                        }}
                        className="hb-btn"
                      />
                      <button style={{ marginLeft: "20px" }}>
                        {" "}
                        <Link to={`/user/publicView/${talent?._id}`}>
                          {" "}
                          View Profile
                        </Link>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CustomSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTalentsPage;
