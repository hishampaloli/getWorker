import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myJobs } from "../../../actions/jobsActions";
import "./mypost.css";
import ActiveJobs from "../../../components/EmployerComponents/MyJobsComps/ActiveJobs";
import AllJobs from "../../../components/EmployerComponents/MyJobsComps/AllJobs";
import CancelledJobs from "../../../components/EmployerComponents/MyJobsComps/CancelledJobs";
import RunningJobs from "../../../components/EmployerComponents/MyJobsComps/RunningJobs";

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ed, setEd] = useState("active");
  const [keyword, setKeyword] = useState("");

  const user = useSelector((state) => state.user);
  const myJobsData = useSelector((state) => state.myJobs);

  const activeJobs = myJobsData?.myJobs?.filter((el) => {
    return el.status === "active";
  });

  const completedJobs = myJobsData?.myJobs?.filter((el) => {
    return el.status === "completed";
  });

  const runningJobs = myJobsData?.myJobs?.filter((el) => {
    return el.status === "running";
  });

  const archiveJobs = myJobsData?.myJobs?.filter((el) => {
    return el.status === "cancelled";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(myJobs(keyword));
  };

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }

    dispatch(myJobs());
  }, [user, navigate, dispatch]);

  return (
    <div className="postJobs">
      <div className="post-box">
        <div className="header">
          <button
            style={
              ed === "active"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("active")}
          >
            Active Jobs
          </button>

          <button
            style={
              ed === "running"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("running")}
          >
            On going Jobs
          </button>
          <button
            style={
              ed === "completed"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("completed")}
          >
            Completed Jobs
          </button>
          <button
            style={
              ed === "archive"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("archive")}
          >
            Archived Jobs
          </button>
        </div>
        <form style={{padding: '0px 20px'}} onSubmit={handleSubmit} className="jobs-search">
          <input
            style={{ width: "81%" }}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="main-body">
          {ed === "active" ? (
            <ActiveJobs jobs={activeJobs} />
          ) : ed === "completed" ? (
            <AllJobs jobs={completedJobs} />
          ) : ed === "running" ? (
            <RunningJobs jobs={runningJobs} />
          ) : ed === "archive" ? (
            <CancelledJobs jobs={archiveJobs} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
