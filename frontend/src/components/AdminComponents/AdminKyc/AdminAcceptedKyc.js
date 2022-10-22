import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { acceptOrRejectKyc } from "../../../actions/adminActions";
import Alert from '@mui/material/Alert';

const AdminAcceptedKyc = ({ acceptedRequest }) => {
  const dispatch = useDispatch();

  const [aathar, setAathar] = useState("");
  const [aatharSelfie, setAatharSelfie] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("")

  
  const kycStatus = useSelector((state) => state.kycReq);
  const [ed, setEd] = useState(false);

  return (
    <div>
      {kycStatus?.loading ?  <Alert style={{}} className="m-1" severity="info">Processing !</Alert>  : ''}
      {acceptedRequest
        ? acceptedRequest?.map((el) => {
            return (
              <div key={el?.owner?._id} className="allkyc-box">
                <div>
                  <p>{el?.owner?.name}</p>
                  <p style={{ marginTop: "-20px" }}>
                    {" "}
                    <strong>{el?.owner?.email}</strong>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEd(true);
                    setAathar(el?.aatharImage);
                    setAatharSelfie(el?.aatharSelfie);
                    setPan(el?.panImage);
                    setGst(el?.gstNumber);
                    setId(el?.owner?._id);
                  }}
                >
                  <VisibilityIcon />
                </button>
              </div>
            );
          })
        : ""}

      {ed ? (
        <div className="admin-kyc-show">
          <div>
            <CancelIcon
              onClick={(e) => setEd(false)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                color: "#3ccf4e",
              }}
            />
            <img src={aathar} alt="" />
            <img src={aatharSelfie} alt="" />
            <img src={pan} alt="" />
            <h2 style={{ marginTop: "10px", color: "white" }} className="mt-5">
              {" "}
              GST: <strong>{gst}</strong>{" "}
            </h2>
          </div>

          <div
            style={{ display: "flex", width: "400px", flexDirection: "row" }}
            className="bfsa"
          >
            <form action="">
            
            <input onChange={(e) => setMsg(e.target.value)} type="text" style={{border: 'none', padding: '10px 15px', borderRadius: '5px'}} placeholder="Reason for Rejecting" />
            <button
              style={{ backgroundColor: "#FF5454"}}
              onClick={() => {
                dispatch(acceptOrRejectKyc(id, "reject", msg));
                setEd(false)
              }}
              className="mx-3 mt-2"
            >
              Reject
            </button>
            </form>
            
          </div>
        </div>
      ) : (
        ""
      )}

      {acceptedRequest.length > 0 ? '': <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img style={{width:"300px"}} src="https://cdn.dribbble.com/users/888330/screenshots/2653750/empty_data_set.png" alt="" />
        </div>}
    </div>
  );
};

export default AdminAcceptedKyc;
