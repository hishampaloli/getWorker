import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../../../actions/EmployerActions";
import { getEmployeeProfile } from "../../../actions/EmplyeeActions";
import ActiveJobs from "../../../components/EmployerComponents/MyJobsComps/ActiveJobs";
import AllJobs from "../../../components/EmployerComponents/MyJobsComps/AllJobs";

const EmployeeJobsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const employeeData = useSelector((state) => state.employeeData);


  const [ed, setEd] = useState("active");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    dispatch(getEmployeeProfile());
  }, [user]);


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
              ed === "completed"
                ? { backgroundColor: "#1d4354", color: "white" }
                : {}
            }
            onClick={() => setEd("completed")}
          >
            Completed Jobs
          </button>
          
          
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
        }} className="jobs-search" style={{padding: '0px 20px'}}>
          <input
            style={{ width: "81%" }}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="main-body">
          {ed === "active" ? (
            <ActiveJobs jobs={employeeData?.userData?.activeContracts} />
          ) : ed === "completed" ? (
            <AllJobs jobs={employeeData?.userData?.completedJobs} />
          )  : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeJobsPage;
