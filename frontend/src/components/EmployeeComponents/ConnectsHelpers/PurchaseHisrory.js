import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myParchaseHistory } from "../../../actions/paymentActions";

const PurchaseHisrory = () => {
  const dispatch = useDispatch();
  const purchaseHistory = useSelector((state) => state.purchaseHistory);

  useEffect(() => {
    dispatch(myParchaseHistory());
  }, []);

  return (
    <div className="history-box">
      <table>
        <tr>
          <th>no:</th>
          <th>Order Id</th>
          <th>Payment Id</th>
          <th>Amount</th>
        </tr>

        {purchaseHistory.history?.details?.map((el, idx) => {
          return (
            <tr className="tr-row">
              <td>{idx + 1}</td>
              <td>{el?.orderId}</td>
              <td>{el?.paymentId}</td>
              <td>{el?.amount}.00</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default PurchaseHisrory;
