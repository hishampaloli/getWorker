import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../actions/jobsActions";
import { logout } from "../../../actions/UserAction";
import EmpJobsComponents from "../../../components/EmployeeComponents/JobsComponent/EmpJobsComponents";
import SavedJobs from "../../../components/EmployeeComponents/SavedJobs/SavedJobs";
import "./EmployeeHome.scss";
import Alert from "@mui/material/Alert";
import { getEmployeeProfile } from "../../../actions/EmplyeeActions";
import DateObject from "react-date-object";
import CustomSpinner from '../../../components/customSpinner/CustomSpinner'
import Paginate from "../../../components/PaginateComponent/Paginate";

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const allJobs = useSelector((state) => state.allJobs);
  const saveStatus = useSelector((state) => state.saveStatus);
  const userProfile = useSelector((state) => state.employeeData);


  const [ed, setEd] = useState("search");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(Number);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllJobs("", page));
  };

  useEffect(() => {
    dispatch(getAllJobs("", page));
  }, [page, dispatch]);

  // dispatch(logout());
  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }

    dispatch(getEmployeeProfile());
    dispatch(getAllJobs(keyword, 1));
  }, [user, dispatch]);

  return (
    <div className="employeeHome">
      <div className="employeehome-div">
        <div className="left">
          <div className="ltop">
            <h4>Monday, september 24th</h4>
            <h3>
              Welcome back <strong> {user?.userInfo?.name}</strong>
            </h3>
          </div>

          <div className="lbottom">
            <div className="job-box-emp">
              <div className="header">
                <button
                  style={
                    ed === "search"
                      ? { backgroundColor: "#1d4354", color: "white" }
                      : {}
                  }
                  onClick={() => setEd("search")}
                >
                  Search
                </button>
                <button
                  style={
                    ed === "saved"
                      ? { backgroundColor: "#1d4354", color: "white" }
                      : {}
                  }
                  onClick={() => setEd("completed")}
                >
                  saved Jobs
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ padding: "0px 25px" }}
                className="jobs-search"
              >
                <input
                  style={{ width: "85%" }}
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>

              <div className="main-body">
                {ed === "search" ? (
                  <div>
                    {" "}
                    {saveStatus?.loading ? (
                      <div className="sv-pp">
                        <Alert severity="info">
                          Successfully saved the job
                        </Alert>
                      </div>
                    ) : (
                      ""
                    )}{" "}
                    <EmpJobsComponents jobs={allJobs?.jobs} sv={false} />
                    <Paginate count={allJobs?.pages} giveBack={setPage} />
                    {allJobs.loading ? <div className="mt-4" style={{width: '100%',display: 'flex', justifyContent: 'center'}} > <CustomSpinner /></div> : ''}
                  </div>
                ) : ed === "completed" ? (
                  <SavedJobs />
                ) : ed === "archive" ? (
                  {
                    /* <CancelledJobs jobs={archiveJobs} /> */
                  }
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="r-top ">
            <div>
              {userProfile?.userData?.image ? (
                <img src={userProfile?.userData?.image} alt="" />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt=""
                />
              )}
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/user/profile"
              >
                <p>{user?.userInfo?.name}</p>
              </Link>
            </div>

            <div>
              <Link to="/user/connects">
                {" "}
                <button style={{ padding: "10px 15px", border: "none" }}>
                  Buy Connects
                </button>
              </Link>
              <Link to="/user/proposals">
                {" "}
                <button style={{ padding: "10px 15px", border: "none" }}>
                  View Proposals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
