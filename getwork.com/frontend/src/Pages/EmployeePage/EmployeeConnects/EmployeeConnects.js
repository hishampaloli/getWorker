import React, { useEffect, useState } from "react";
import "./EmployeeConnects.scss";
import { useDispatch } from "react-redux";
import { checkout, myParchaseHistory } from "../../../actions/paymentActions";

const EmployeeConnects = () => {
  const dispatch = useDispatch();

  const [ed, setEd] = useState("connect");

  useEffect(() => {
    dispatch(myParchaseHistory())
  }, [])

  return (
    <div className="employeeConnects">
      <div>
        <h2>Buy connects</h2>
      </div>

      <div className="connect-box">
        <div className="left">
          <button onClick={() => setEd('connect')} >Buy Connects</button>
          <button onClick={() => setEd('history')} >Purchase Hitsory</button>
        </div>

        <div className="right">

        {ed === 'connect' ? <div className="row">
            <div className="buy-box">
              <p>100 connects</p>
              <p>
                Buy for <strong>RS: 500.00</strong>
              </p>
              <h3>Basic Pack</h3>
              <button
                onClick={() => {
                  dispatch(checkout(500));
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="buy-box">
              <p>200 connects</p>
              <p>
                Buy for <strong>RS: 1000.00</strong>
              </p>
              <h3>Basic Pack</h3>
              <button
                onClick={() => {
                  dispatch(checkout(1000));
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="buy-box">
              <p>500 connects</p>
              <p>
                Buy for <strong>RS: 5000.00</strong>
              </p>
              <h3>Basic Pack</h3>
              <button
                onClick={() => {
                  dispatch(checkout(5000));
                }}
              >
                Buy Now
              </button>
            </div>
          </div> : <div className="row-1">tyfghvj</div> }
          
        </div>
      </div>
    </div>
  );
};

export default EmployeeConnects;
