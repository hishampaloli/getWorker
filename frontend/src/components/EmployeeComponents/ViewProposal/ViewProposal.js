import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { JobsDetails } from "../../../actions/jobsActions";
import {
  acceptProposal,
  proposalState,
  viewProposals,
} from "../../../actions/proposalActions";
import CustomSpinner from "../../customSpinner/CustomSpinner";
import "./ViewProposal.css";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import { getMyRooms } from "../../../actions/chatActions";

const ViewProposal = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewProposal = useSelector((state) => state.viewProposal?.data);
  const user = useSelector((state) => state.user);
  const acceptProposalData = useSelector((state) => state.acceptProposal);

  const { id } = useParams();
  useEffect(() => {
    dispatch(viewProposals(id));
    setMsg(false);
    if (acceptProposalData.data) {
      // navigate("/employer/myposts");
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created-server", (roomId) => {
      navigate(`/employer/message`)
    });

  }, [socket]);

  const [rooms, setRooms] = useState([]);

  const [msg, setMsg] = useState(false);

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
              Budget: <strong> ₹{viewProposal?.bid}</strong>
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
              {user.userInfo?.isBlocked ? (
                <button style={{ backgroundColor: "#FF6C6C" }}>
                  Your account is Blocked
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(
                      acceptProposal(viewProposal?._id, viewProposal?.bid)
                    );
                    setTimeout(() => {}, 1000);
                    setMsg(true);

                    socket.emit("new-room-created", {
                      employer: user?.userInfo?._id,
                      employee: viewProposal?.owner?._id,
                    });
                  }}
                >
                  Accept Proposal
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        {acceptProposalData.loading ? (
          <div
            style={{ width: "90%", display: "flex", justifyContent: "center" }}
          >
            <CustomSpinner />
          </div>
        ) : (
          ""
        )}

        {acceptProposalData.data && msg ? (
          <Alert severity="success">Contract started succussfully</Alert>
        ) : msg ? (
          <Alert severity="error">
            No balance to start the Contract, please recharge
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ViewProposal;
