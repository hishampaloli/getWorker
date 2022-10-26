import React, { useEffect, useState } from "react";
import "./PropodalPage.scss";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { postProposal } from "../../../actions/proposalActions";
import { POST_PROPOSAL_REQUEST } from "../../../contants/proposalConstants";

const ProposalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobsInfo = useSelector((state) => state.jobsDetail?.jobDetails);
  const user = useSelector((state) => state.user);
  const postProposalStatus = useSelector((state) => state.postProposalStatus);

  const userProfile = useSelector((state) => state.employeeData);


  const { id } = useParams();
  const [cover, setCover] = useState("");
  const [bid, setBid] = useState("");
  const [days, setDays] = useState("");
  const [alert, setAler] = useState(false);
  const [msg, setMsg] = useState(false);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bid > jobsInfo?.budget || bid < 20 || days <= 0) {
    } else {
      if (userProfile.userData?.connects >= 5) {
        dispatch(postProposal(id, 5, cover, bid, days));
        setAler(true);

        setTimeout(() => {
          setAler(false);
          navigate(`/user/proposals`);
        }, 1000);
      } else {
        setMsg(true);
      }
    }
  };

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  })


  return (
    <div className="proposalPage">
      <div className="proposal-div">
        <div className="top">
          <h3 className="mt-2">Send Proposal</h3>
          <p className="mt-3">
            <Link style={{ color: "#3ccf4e" }} to={`/jobs/${id}`}>
              {" "}
              view job
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bottom">
            <div className="inp-div mt-5">
              <label htmlFor="">Cover letter</label>
              <textarea
                onChange={(e) => setCover(e.target.value)}
                name=""
                placeholder="Enter a detailed description on why the employer should choose you"
                id=""
                required
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className="inp-div mt-3">
              <label htmlFor="">
                Your Bid ({`₹20.00 - ₹${jobsInfo.budget}.00`})
              </label>
              <InputGroup className="mb-3 in">
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  onChange={(e) => setBid(e.target.value)}
                  type="number"
                  required
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              {(bid > jobsInfo?.budget || bid < 20) && bid !== "" ? (
                <p
                  style={{
                    color: "#FF5454",
                    fontSize: "12px",
                    marginTop: "-10px",
                  }}
                >
                  Enter a amount between {`₹20.00 - ₹${jobsInfo?.budget}.00`}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="inp-div mt-3">
              <label htmlFor="">Days need to finish</label>
              <InputGroup className="mb-3 in">
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => setDays(e.target.value)}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>days</InputGroup.Text>
              </InputGroup>
              {days <= 0 && days !== "" ? (
                <p
                  style={{
                    color: "#FF5454",
                    fontSize: "12px",
                    marginTop: "-10px",
                  }}
                >
                  Days cannot be negative
                </p>
              ) : (
                ""
              )}
            </div>
            {user.userInfo?.isBlocked ? <button style={{backgroundColor: '#FF9393'}} className="pp-btn" disabled>
              Account blocked
            </button> : <button className="pp-btn" type="submit">
              Submit a proposal for 5 credits
            </button>}
            
            {postProposalStatus?.loading ? (
              <Alert severity="info">
                On progress
              </Alert>
            ) : (
              ""
            )}
            {postProposalStatus?.message && alert ? (
              <Alert severity="info">Succussfully submited!</Alert>
            ) : (
              ""
            )}

            {msg ? (
              <Alert severity="error">
                No Credit available for sending the Proposal!
              </Alert>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalPage;
