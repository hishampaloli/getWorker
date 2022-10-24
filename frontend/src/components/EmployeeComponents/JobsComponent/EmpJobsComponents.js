import React from "react";
import { Link } from "react-router-dom";
import "./emplJobscom.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useDispatch } from "react-redux";
import { removeSaveJobs, saveJobs } from "../../../actions/EmplyeeActions";

import Alert from "@mui/material/Alert";

const EmpJobsComponents = ({ jobs, sv }) => {
  const dispatch = useDispatch();

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
      {jobs
        ? jobs?.map((job) => {
            return (
              <div key={job._id} className="emp-jobs-div">
                <div className="s">
                  <h4 style={{ color: "#1d4354" }}>{job?.title?.toString().slice(0, 50)}...</h4>

                  <p  className="mt-3">{job?.description?.toString().slice(0, 100)}...</p>

                  <div className="rowEm">
                    <p className="rpEm  mt-0">
                      Difficulty: <strong>{job?.level}</strong>
                    </p>

                    <p className="rpEm  mt-0">
                      Deadline: <strong>{job?.deadline} days</strong>
                    </p>
                  </div>

                  <div style={{display: 'flex'}}>
                    <p className="mt-2">
                      Est.Budget: <strong>₹{job?.budget}</strong>
                    </p>

                    <p className="mt-2" >Proposals: {job?.proposals?.length}</p>
                  </div>

                 
                </div>

                <div className="btn-group">

                <Link to={`/jobs/${job?._id}`}>
                  <button style={{ marginLeft: "auto" }} className="eyebtnnn">
                    <VisibilityIcon />
                  </button>
                </Link>

                {sv ? (
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
                )}
                </div>
              </div>
            );
          })
        : ""}
        
    </div>
  );
};

export default EmpJobsComponents;
