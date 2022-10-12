import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { JobsDetails } from "../../../actions/jobsActions";
import { acceptProposal, proposalState, viewProposals } from "../../../actions/proposalActions";
import "./ViewProposal.css";

const ViewProposal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewProposal = useSelector((state) => state.viewProposal?.data);
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  useEffect(() => {
    dispatch(viewProposals(id));
  }, []);

  console.log(viewProposal);

  const jobsInfo = [];

  const [ed, setEd] = useState("");

  return (
    <div className="jobsDetails-view">
      <div className="job-details-box">
        <div
          className="top"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h4>Proposal</h4>

          <Link style={{ color: "#3ccf4e" }} to={`/jobs/${viewProposal?.jobs}`}>
            <p>View Job posting</p>
          </Link>
        </div>

        <div className="bottom">
          <p>{viewProposal?.cover}</p>

          <div className="row">
            <p>
              Budget: <strong>${viewProposal?.bid}</strong>
            </p>
            <p>
              Deadline: <strong>{viewProposal?.deadline} days</strong>
            </p>

            <Link to={`/user/publicView/${viewProposal?.owner?._id}`}>
              <button>Proposed By: {viewProposal?.owner?.name}</button>
            </Link>
          </div>

          {user?.userInfo?.userType === "employer" ? (
            <div className="proposal-view-actions">
              {viewProposal?.status === "shortlisted" ? (
                <button
                  className="rej"
                  onClick={(e) => {
                    dispatch(proposalState(viewProposal?._id, "rejected"));
                    navigate(`/jobs/${viewProposal?.jobs}`);
                    dispatch(JobsDetails(viewProposal?.jobs));
                  }}
                >
                  Reject
                </button>
              ) : viewProposal?.status === "rejected" ? (
                <button
                  className="short"
                  style={{ backgroundColor: "#75E6FF" }}
                  onClick={(e) => {
                    dispatch(proposalState(viewProposal?._id, "shortlisted"));
                    navigate(`/jobs/${viewProposal?.jobs}`);
                  }}
                >
                  Shortlist
                </button>
              ) : (
                <>
                  {" "}
                  <button
                    className="rej"
                    style={{ backgroundColor: "#75E6FF" }}
                    onClick={(e) => {
                      dispatch(proposalState(viewProposal?._id, "shortlisted"));
                      navigate(`/jobs/${viewProposal?.jobs}`);
                    }}
                  >
                    reject
                  </button>{" "}
                  <button
                    className="short"
                    style={{ backgroundColor: "#75E6FF" }}
                    onClick={(e) => {
                      dispatch(proposalState(viewProposal?._id, "shortlisted"));
                      navigate(`/jobs/${viewProposal?.jobs}`);
                    }}
                  >
                    Shortlist
                  </button>{" "}
                </>
              )}
              {user.userInfo?.isBlocked ? <button style={{backgroundColor: '#FF6C6C'}} >Your account is Blocked</button> : <button onClick={() => dispatch(acceptProposal(viewProposal?._id,viewProposal?.bid))}>Accept Proposal</button>}
              
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProposal;
