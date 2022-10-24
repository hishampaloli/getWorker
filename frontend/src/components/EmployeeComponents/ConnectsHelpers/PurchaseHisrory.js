import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myParchaseHistory } from "../../../actions/paymentActions";
import { ParchaseHistory } from "../../../actions/adminActions";

const PurchaseHisrory = () => {
  const dispatch = useDispatch();
  const purchaseHistoryy = useSelector((state) => state.purchaseHistory);
  const {
    userInfo: { userType },
  } = useSelector((state) => state.user);


  useEffect(() => {
    if (userType !== "admin") {
      dispatch(myParchaseHistory());
    } else {
      dispatch(ParchaseHistory());
    }
  }, []);

  return (
    <div style={{ padding: "20px", width: "100%" }} className="history-box">
      <table>
        <thead>
          <tr>
            <th>no:</th>
            <th>Order Id</th>
            <th>Payment Id</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        {userType === "admin" ? (
          <>
            {purchaseHistoryy.history?.map((el, idx) => {
              return (
                <tbody key={el.orderId}>
                  <tr className="tr-row">
                    <td>{idx + 1}</td>
                    <td>{el?.orderId}</td>
                    <td>{el?.paymentId}</td>
                    <td>{el?.amount}.00</td>
                    <td>
                      {el?.method === "PayPal" ? (
                        <img
                          style={{ width: "50px" }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                          alt=""
                        />
                      ) : (
                        <img
                          style={{ width: "50px" }}
                          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Razorpay_logo.svg/1896px-Razorpay_logo.svg.png"
                          alt=""
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </>
        ) : (
          <>
            {purchaseHistoryy.history?.details?.map((el, idx) => {
              return (
                <tbody key={el.orderId}>
                  <tr className="tr-row">
                    <td>{idx + 1}</td>
                    <td>{el?.orderId}</td>
                    <td>{el?.paymentId}</td>
                    <td>{el?.amount}.00</td>
                    <td>
                      {el?.method === "PayPal" ? (
                        <img
                          style={{ width: "50px" }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                          alt=""
                        />
                      ) : (
                        <img
                          style={{ width: "50px" }}
                          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Razorpay_logo.svg/1896px-Razorpay_logo.svg.png"
                          alt=""
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </>
        )}
      </table>
    </div>
  );
};

export default PurchaseHisrory;
