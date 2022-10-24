import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Paypay = ({ amount, user, fail, succuss, noFail }) => {
  const [paint, setpaint] = useState(false);

console.log(user);
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
            noFail()
          return actions.order.create({
            purchase_units: [
              {
                description: "Purchase Connects",
                amount: {
                  value: Math.floor(amount / 82.61) + 1,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
            
            succuss()
          const order = await actions.order.capture();

          const tokenId = JSON.parse(localStorage.getItem("userInfo"));

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenId.token}`,
            },
          };

          const { dat } = await axios.post(
            `http://localhost:3001/api/credit/paypalVerification?userId=${tokenId._id}&amount=${data?.amount}&user=${user}`,
            config
          );
        }}
        onCancel={() => {
            console.log('failed')
            fail()
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    </div>
  );
};

export default Paypay;
