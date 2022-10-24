import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkout } from "../../../actions/paymentActions";
import Paypay from "./Paypay";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const BuyBox = ({ buy, amount, user }) => {
    console.log(user);
  const [fail, setFail] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="pay-main-box">
      <div className="pay-box">
    <CloseIcon onClick={() => buy()} style={{position: 'absolute', right: '10px', color: '#FF5454'}} />
        <h3>Pay ₹{amount}.00 with</h3>

        <button
          style={{ backgroundColor: "white" }}
          onClick={() => {
            setFail("");
            dispatch(checkout(amount, user));
          }}
        >
          <img
            style={{ width: "40%", height: "20px" }}
            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Razorpay_logo.svg/1896px-Razorpay_logo.svg.png"
            alt=""
          />
        </button>
        <p>
          {" "}
          <strong>OR</strong>
        </p>
        <div className="mt-4">
          <Paypay
            amount={amount}
            user={user}
            noFail={() => setFail("")}
            fail={() => setFail("fail")}
            succuss={() => setFail("succuss")}
          />
          {fail === "fail" ? (
            <Alert severity="error">Payment failed</Alert>
          ) : fail === "" ? (
            ""
          ) : (
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyBox;
