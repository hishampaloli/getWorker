import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { border, padding } from "@mui/system";
import { useDispatch } from "react-redux";
import { doWithdraw } from "../../../actions/adminActions";

const AdminWithDrawComponent = ({ data }) => {
  const dispatch = useDispatch();
  

  return (
    <>
      {data?.map((el) => {
        return (
          <div key={el._id} className="withdraw-history">
            <div>
              <strong>{el?.owner?.name}</strong>
              <p>₹{el?.amount}.00</p>
            </div>

            <div className="btn-gp">
              {el?.status !== "pending" ? (
                <button
                  style={{
                    backgroundColor: "#3ccf4e",
                    padding: "10px 15px",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  className="pn-btn"
                >
                  Paid
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(doWithdraw(el?._id));
                  }}
                  style={{
                    backgroundColor: "#FF5454",
                    padding: "10px 15px",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  className="pn-btn"
                >
                  Mark as Done
                </button>
              )}

              {/* <button
        style={{
          backgroundColor: "#75E6FF",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          border: 'none',
          color: 'white',
          marginLeft: '20px'
          
        }}
        className="pn-btn knefr"
      >
        {" "}
        <VisibilityIcon />{" "}
      </button> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AdminWithDrawComponent;
