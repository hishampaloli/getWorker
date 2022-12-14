import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myProposals } from "../../../actions/proposalActions";
import ProposalComponent from "../../../components/EmployeeComponents/ProposalComponents/ProposalComponent";

const AllProposal = () => {
  const dispatch = useDispatch();

  const myProposalData = useSelector((state) => state.myProposalsData);
  const [ed, setEd] = useState("active");

  console.log(myProposalData);

  const activeProposals = myProposalData?.data?.filter((el) => {
    return el.status === "active";
  });

  const rejectedProposals = myProposalData?.data?.filter((el) => {
    return el.status === "rejected";
  });

  const shortListedProposals = myProposalData?.data?.filter((el) => {
    return el.status === "shortlisted";
  });

  console.log(activeProposals);
  console.log(rejectedProposals);

  useEffect(() => {
    dispatch(myProposals());
  }, []);
  return (
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
            <ProposalComponent proposals={shortListedProposals} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProposal;
