import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkout } from "../../../actions/paymentActions";
import BuyBox from "./BuyBox";
import Paypay from "./Paypay";
import './BuyBox.scss'

const ConnectBox = ({ user, number, amount, pack }) => {
  const [buy, setBuy] = useState(false);
  
  return (
    <div className="buy-box">
      {user === "employer" ? (
        <>
          <p>
            Recharge for <strong>RS: {amount}.00</strong>
          </p>
          <h3>{pack}</h3>
         
          <button onClick={() => setBuy(true)} >
            Buy Now
          </button>

          {buy ? <BuyBox buy={() =>setBuy(false)} amount={amount} user={user} /> : ''}
      
        </>
      ) : (
        <>
          <p>{number} connects</p>
          <p>
            Buy for <strong>RS: {amount}.00</strong>
          </p>
          <h3>{pack}</h3>

          <button onClick={() => setBuy(true)} >
            Buy Now
          </button>

          {buy ? <BuyBox buy={() =>setBuy(false)} amount={amount} user={user} /> : ''}
         
        </>
      )}

     
     
    </div>
  );
};

export default ConnectBox;
