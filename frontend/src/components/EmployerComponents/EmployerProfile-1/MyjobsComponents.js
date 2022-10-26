import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./myjobs.scss";
import { Link } from "react-router-dom";
import Paginate from "../../PaginateComponent/Paginate";

const MyjobsComponents = ({ jobs }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobs?.slice(indexOfFirstPost, indexOfLastPost);


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
        ? currentPosts?.map((job,idx) => {
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
        {jobs?.length > 2 && <Paginate count={Math.ceil(jobs?.length / postsPerPage )} giveBack={setCurrentPage} />
}
    </div>
  );
};

export default MyjobsComponents;
