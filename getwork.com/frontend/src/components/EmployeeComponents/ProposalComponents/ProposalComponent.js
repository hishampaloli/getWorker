import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useDispatch } from "react-redux";
import { removeSaveJobs, saveJobs } from "../../../actions/EmplyeeActions";
import { Link } from "react-router-dom";

const ProposalComponent = ({ proposals }) => {
  const dispatch = useDispatch();

  console.log(proposals);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {proposals
        ? proposals?.map((proposal) => {
            return (
              <div className="emp-jobs-div">
                <div className="s">
                  <h4>{proposal?.cover?.slice(0, 20)}...</h4>

                  <div style={{display: 'flex', alignItems: 'center', width: '100%'}} className="rowEm ">
                    <p className="mt-2">
                     Your Bid: <strong>${proposal?.bid}</strong>
                    </p>
                    <p style={{whiteSpace: 'nowrap', width: '200px'}} className="rpEm mt-2">
                      Deadline: <strong>{proposal?.deadline} days</strong>
                    </p>
                  </div>
                </div>

                <Link to={`/jobs/${proposal?._id}`}>
                  <button style={{ marginLeft: "auto" }} className="eyebtnnn">
                    <VisibilityIcon />
                  </button>
                </Link>

                {/* {sv ? (
                  <Link>
                    <button
                      onClick={() => dispatch(removeSaveJobs(job?._id))}
                      style={{ marginLeft: "auto" }}
                      className="savedbtnnn"
                    >
                      <BookmarkRemoveIcon />
                    </button>
                  </Link>
                ) : (
                  <Link>
                    <button
                      onClick={() => dispatch(saveJobs(job?._id))}
                      style={{ marginLeft: "auto" }}
                      className="savedbtnnn"
                    >
                      <BookmarkBorderIcon />
                    </button>
                  </Link>
                )} */}
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ProposalComponent;
