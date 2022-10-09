import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./JobsView.css";
import { JobsDetails } from "../../../actions/jobsActions";
import AllProposal from "../../EmployeePage/AllProposal/AllProposal";
import ProposalComponent from "../../../components/EmployeeComponents/ProposalComponents/ProposalComponent";

const JobView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const jobsInfo = useSelector((state) => state.jobsDetail?.jobDetails);
  const myProposalData = useSelector((state) => state.myProposalsData);
  const [ed, setEd] = useState("active");

  const activeProposals = jobsInfo?.proposals?.filter((el) => {
    return el.status === "active";
  });

  const rejectedProposals = jobsInfo?.proposals?.filter((el) => {
    return el.status === "rejected";
  });

  const shortLitedProposals = jobsInfo?.proposals?.filter((el) => {
    return el.status === "shortlisted";
  });

  console.log(jobsInfo);


  useEffect(() => {
    console.log(id);
    dispatch(JobsDetails(id));
  }, []);

  return (
    <div className="jobsDetails-view">
      <div className="job-details-box">
        <div className="top">
          <h4>{jobsInfo?.title}</h4>
        </div>

        <div className="bottom">
          <p>{jobsInfo?.description}</p>

          <div className="row">
            <p>
              Budget: <strong>${jobsInfo?.budget}</strong>
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

          <Link to={`/jobs/${jobsInfo?._id}/proposal`}>
            <button>Submit Proposal</button>
          </Link>
        </div>
      </div>

      <div style={{width: '100%'}}>
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
            <ProposalComponent proposals={activeProposals} />
          ) : ed === "rejected" ? (
            <ProposalComponent proposals={rejectedProposals} />
          ) : ed === "shortlisted" ? (
            <ProposalComponent proposals={shortLitedProposals} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default JobView;
