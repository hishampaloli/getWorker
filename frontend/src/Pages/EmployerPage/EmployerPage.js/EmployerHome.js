import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../../../actions/EmployerActions";
import { myJobs } from "../../../actions/jobsActions";
import MyjobsComponents from "../../../components/EmployerComponents/EmployerProfile-1/MyjobsComponents";
import "./EmployerPage.scss";

const EmployerHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const employerData = useSelector((state) => state.employerData);
  const userName = employerData?.userInfo?.owner?.name;
  const myJobsData = useSelector((state) => state.myJobs);

  


  const activeJobs = myJobsData?.myJobs?.filter((el) => {
    return el.status === "active";
  });

  const running = myJobsData?.myJobs?.filter((el) => {
    return el.status === "running";
  });


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

    dispatch(getEmployerProfile());
    dispatch(myJobs());
  }, [user, navigate, dispatch]);

  return (
    <div className="employeePage">
      <div className="top">
        <div className="left">
          <h2>Welcome back</h2>
          <p>{userName}</p>
        </div>

        <div className="right">
          <button>
            {" "}
            <Link to="/employer/postjob">Post a Jobs</Link>
          </button>
        </div>
      </div>

      <div className="bottom">
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div className="left">
          <div className="homeJobs-top">
            <h3>Your Active Posts</h3>
            <p>
              {" "}
              <Link to="/employer/myposts" style={{ color: "#3ccf4e" }}>
                {" "}
                view all posts
              </Link>
            </p>
          </div>

          <div className="homeJobs-bottom">
            {activeJobs?.length !== 0   ? (
              <MyjobsComponents jobs={activeJobs} />
              
            ) : (
              <div>
                {" "}
                <img
                  style={{ width: "200px" }}
                  src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/folder-green-512.png"
                  alt=""
                />
                <h4 style={{ color: "#aaad" }} className="mt-3">
                  No Active jobs
                </h4>
              </div>
            )}
          </div>
        </div>

        <div className="left mt-5">
          <div className="homeJobs-top">
            <h3>Your On going jobs</h3>
            <p>
              {" "}
              <Link to="/employer/myposts" style={{ color: "#3ccf4e" }}>
                {" "}
                view all posts
              </Link>
            </p>
          </div>

          <div className="homeJobs-bottom">
            {running?.length !== 0   ? (
              <MyjobsComponents jobs={running} />
              
            ) : (
              <div>
                {" "}
                <img
                  style={{ width: "200px" }}
                  src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/folder-green-512.png"
                  alt=""
                />
                <h4 style={{ color: "#aaad" }} className="mt-3">
                  No Active jobs
                </h4>
              </div>
            )}
          </div>
        </div>
</div>
      </div>
    </div>
  );
};

export default EmployerHome;
