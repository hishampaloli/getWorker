import React from "react";
import { useDispatch } from "react-redux";
import { checkout } from "../../../actions/paymentActions";

const ConnectBox = ({ user, number, amount, pack }) => {
  const dispatch = useDispatch();
  
  return (
    <div className="buy-box">
      {user === "employer" ? (
        <>
          <p>
            Recharge for <strong>RS: {amount}.00</strong>
          </p>
          <h3>{pack}</h3>
          <button
        onClick={() => {
          dispatch(checkout(amount, 'employer'));
        }}
      >
        Recharge Now
      </button>
        </>
      ) : (
        <>
          <p>{number} connects</p>
          <p>
            Buy for <strong>RS: {amount}.00</strong>
          </p>
          <h3>{pack}</h3>
          <button
        onClick={() => {
          dispatch(checkout(amount,'employee'));
        }}
      >
        Buy Now
      </button>
        </>
      )}

     
    </div>
  );
};

export default ConnectBox;
