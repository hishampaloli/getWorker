import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./myjobs.scss";
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
        ? jobs?.map((job,idx) => {
            return (
              <div key={job?._id + idx} className="my-jobs-div">
                <div className="s">
                  <h4>{job?.title}</h4>
                  <p className="mt-3">
                    status:{" "}
                    <span style={{ color: "#3ccf4e" }}>{job?.status}</span>
                  </p>
                  <p>
                    Proposals:{" "}
                    <span style={{ color: "#3ccf4e" }}>{job?.proposals?.length}</span>
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
