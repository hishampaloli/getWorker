import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./JobsView.css";
import { JobsDetails } from "../../../actions/jobsActions";

const JobView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const jobsInfo = useSelector((state) => state.jobsDetail?.jobDetails);

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
    </div>
  );
};

export default JobView;
