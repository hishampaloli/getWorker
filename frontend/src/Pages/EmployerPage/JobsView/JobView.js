import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./JobsView.scss";
import {
  approveJob,
  cancelJob,
  JobsDetails,
} from "../../../actions/jobsActions";
import AllProposal from "../../EmployeePage/AllProposal/AllProposal";
import ProposalComponent from "../../../components/EmployeeComponents/ProposalComponents/ProposalComponent";

const JobView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const jobsInfo = useSelector((state) => state.jobsDetail?.jobDetails);
  const myProposalData = useSelector((state) => state.myProposalsData);
  const user = useSelector((state) => state.user);

  const [ed, setEd] = useState("active");
  const [filter, setFilter] = useState(false);

  const activeProposals = jobsInfo?.proposals?.filter((el) => {
    return (
      el.status === "active" ||
      el.status === "rejected" ||
      el.status === "shortlisted"
    );
  });

  const rejectedProposals = jobsInfo?.proposals?.filter((el) => {
    return el.status === "rejected";
  });

  const shortLitedProposals = jobsInfo?.proposals?.filter((el) => {
    return el.status === "shortlisted";
  });

  useEffect(() => {
    dispatch(JobsDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="jobsDetails-view">
      <div className="job-details-box">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="top"
        >
          <h4>{jobsInfo?.title}</h4>
          <Link
            to={`/employer/publicview/${jobsInfo?.owner}`}
            style={{ color: "#3ccf4e", textDecoration: "underLine" }}
          >
            Employer
          </Link>
        </div>

        <div className="bottom">
          <p>{jobsInfo?.description}</p>

          <div className="row">
            <p>
              Budget: <strong>₹{jobsInfo?.budget}</strong>
            </p>
            <p>
              Deadline: <strong>{jobsInfo?.deadline} days</strong>
            </p>
            <p>
              Difficulty:{" "}
              <strong>
                {jobsInfo?.level === "advanced" ? (
                  <span style={{ color: "#FF9393" }}>{jobsInfo?.level}</span>
                ) : (
                  <span style={{ color: "#3ccf4e" }}>{jobsInfo?.level}</span>
                )}
              </strong>{" "}
            </p>
          </div>
          {user?.userInfo?.userType === "employer" ? (
            <>
              {jobsInfo?.status === "running" ? (
                <button
                  onClick={() => {
                    dispatch(approveJob(jobsInfo?._id));
                    navigate("/");
                  }}
                  style={{ backgroundColor: "#3ccf4e" }}
                >
                  Approve Job
                </button>
              ) : jobsInfo?.status === "active" ? (
                <Link to={`/employer/myposts`}>
                  <button
                    onClick={() => dispatch(cancelJob(jobsInfo?._id))}
                    style={{ backgroundColor: "#FF6C6C" }}
                  >
                    Cancel Job
                  </button>
                </Link>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {jobsInfo?.status === "active" ? (
                <Link to={`/jobs/${jobsInfo?._id}/proposal`}>
                  <button>Submit Proposal</button>
                </Link>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>

      {user?.userInfo?.userType === "employer" &&
      jobsInfo?.status !== "cancelled" &&
      jobsInfo?.status !== "completed" &&
      jobsInfo?.status !== "running" ? (
        <div style={{ width: "100%" }}>
          <div className="postJobs">
            <div className="post-box">
              <div
                className="header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button
                    style={
                      ed === "active"
                        ? { backgroundColor: "#1d4354", color: "white" }
                        : {}
                    }
                    onClick={() => setEd("active")}
                  >
                    Active Proposals
                  </button>
                  <button
                    style={
                      ed === "rejected"
                        ? { backgroundColor: "#1d4354", color: "white" }
                        : {}
                    }
                    onClick={() => setEd("rejected")}
                  >
                    Rejected Proposals
                  </button>
                  <button
                    style={
                      ed === "shortlisted"
                        ? { backgroundColor: "#1d4354", color: "white" }
                        : {}
                    }
                    onClick={() => setEd("shortlisted")}
                  >
                    ShortListed Proposals
                  </button>
                </div>
                <div style={{ display: "flex" }}>
                  <button onClick={() => setFilter(!filter)}>
                    Sort by Bids
                  </button>
                </div>
              </div>
              {/* <form  className="jobs-search">
          <input
            style={{ width: "81%" }}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form> */}

              <div className="main-body">
                {ed === "active" ? (
                  <ProposalComponent
                    proposals={activeProposals}
                    sort={filter}
                  />
                ) : ed === "rejected" ? (
                  <ProposalComponent
                    proposals={rejectedProposals}
                    sort={filter}
                  />
                ) : ed === "shortlisted" ? (
                  <ProposalComponent
                    proposals={shortLitedProposals}
                    sort={filter}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default JobView;
