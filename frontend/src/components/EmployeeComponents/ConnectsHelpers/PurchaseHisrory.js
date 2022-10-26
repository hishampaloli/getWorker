import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myParchaseHistory } from "../../../actions/paymentActions";
import { ParchaseHistory } from "../../../actions/adminActions";
import Paginate from "../../PaginateComponent/Paginate";

const PurchaseHisrory = () => {
  const dispatch = useDispatch();
  const purchaseHistoryy = useSelector((state) => state.purchaseHistory);

  const {
    userInfo: { userType },
  } = useSelector((state) => state.user);

  const data = userType === 'admin' ? purchaseHistoryy.history : purchaseHistoryy?.history?.details;
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userType === 'admin' ? data?.slice(indexOfFirstPost, indexOfLastPost) : data?.slice(indexOfFirstPost, indexOfLastPost);
  // const admPosts = admData?.slice(indexOfFirstPost, indexOfLastPost);



  useEffect(() => {
    if (userType !== "admin") {
      dispatch(myParchaseHistory());
    } else {
      dispatch(ParchaseHistory());
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="history-box"
    >
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
            {currentPosts?.map((el, idx) => {
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
            {currentPosts?.map((el, idx) => {
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

      {userType === "admin" ? (
        <div style={{width: '100%'}}>
          <Paginate
            count={Math.ceil(data?.length / postsPerPage)}
            giveBack={setPage}
          />
        </div>
      ) : (
        <Paginate
          count={Math.ceil(data?.length / postsPerPage)}
          giveBack={setPage}
        />
      )}
    </div>
  );
};

export default PurchaseHisrory;
