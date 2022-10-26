import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useDispatch } from "react-redux";
import { removeSaveJobs, saveJobs } from "../../../actions/EmplyeeActions";
import { Link } from "react-router-dom";
import "./ProposalComponent.scss";
import Paginate from "../../PaginateComponent/Paginate";

const ProposalComponent = ({ proposals, sort }) => {
  const dispatch = useDispatch();

  if (sort) {
    proposals?.sort((a, b) => {
      return a.bid - b.bid;
    });
  }
  const data = proposals;

  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  console.log(data);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentPosts
          ? currentPosts?.map((proposal) => {
              return (
                <div key={proposal._id} className="emp-prop-div">
                  <div className="s">
                    <h4>{proposal?.cover?.slice(0, 20)}...</h4>

                    <div className="rowEm ">
                      <p className="mt-2">
                        Your Bid: <strong>₹{proposal?.bid}</strong>
                      </p>
                      <p style={{ whiteSpace: "nowrap" }} className="rpEm mt-2">
                        Deadline: <strong>{proposal?.deadline} days</strong>
                      </p>
                    </div>
                  </div>

                  <Link to={`/user/proposal/${proposal?._id}`}>
                    <button style={{ marginLeft: "auto" }} className="eyebtnnx">
                      <VisibilityIcon />
                    </button>
                  </Link>
                </div>
              );
            })
          : ""}
      </div>

      {data?.length !== 0 && (
        <Paginate
          count={Math.ceil(data?.length / postsPerPage)}
          giveBack={setPage}
        />
      )}
    </>
  );
};

export default ProposalComponent;
