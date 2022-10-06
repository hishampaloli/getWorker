import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  findTalents,
  getEmployerProfile,
  removeSavedTalent,
  saveTalents,
} from "../../../actions/EmployerActions";
import { Link } from "react-router-dom";
import "./FindTalent.css";

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
  const [savedJobs, setSavedJobs] = useState("");
  const [showSavedJobs, setShowSavedJobs] = useState("");
  const [alert, setAlret] = useState(false);
  const [alertR, setAlretR] = useState(false);

  console.log(employerData);
  console.log(talents);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log(786);
  }, [user]);

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
      <div className="left">
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
              type="checkbox"
              name="sd"
              onChange={(e) => setEarnings(400)}
              id=""
            />
          </div>
          <div className="cate-div">
            <label htmlFor="">{"1000 +"} </label>
            <input type="checkbox" name="" id="" />
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
      </div>
      <div className="right">
        <div className="top">
          <button onClick={(e) => setShowSavedJobs("")}>
            Search <strong>{talents?.data?.length}</strong>
          </button>
          <button
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
                <button type="submit">Filter</button>
              </form>
            </div>

            <div className="bottom">
              {talents
                ? talents?.data?.map((talent) => {
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
                              <strong>{talent?.totalEarned}</strong>
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
                          <button>
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
                : '' }
            </div>
            {talents?.data  ? '' : <img style={{width: '200px'}} src="https://img.freepik.com/free-vector/illustration-search-box_53876-37578.jpg?w=2000" alt="" /> }
          </>
        ) : (
          <div className="bottom">
            {employerData
              ? employerData?.userInfo?.savedTalents.map((talent) => {
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
                          style={{ color: "#3ccf4e" }}
                        />
                        <button>
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
              : "oij"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTalentsPage;
