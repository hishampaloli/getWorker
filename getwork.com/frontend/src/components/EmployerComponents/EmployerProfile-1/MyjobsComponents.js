import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./myjobs.css";
import { Link } from "react-router-dom";

const MyjobsComponents = ({ jobs }) => {
  console.log(jobs);
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
              <div className="my-jobs-div">
                <div className="s">
                  <h4>{job?.title}</h4>
                  <p>
                    status:{" "}
                    <span style={{ color: "#3ccf4e" }}>{job?.status}</span>
                  </p>
                </div>

                <Link to={`/jobs/${job?._id}`}>
                  <button style={{ marginLeft: "auto" }} className="eyebtnn">
                    <VisibilityIcon />
                  </button>
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default MyjobsComponents;
