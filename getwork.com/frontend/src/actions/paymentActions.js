import { axiosPaymentInstance } from "../contants/axios";
import {
  PURCHASE_hISTORY_FAIL,
  PURCHASE_hISTORY_REQUEST,
  PURCHASE_hISTORY_SUCCUSS,
} from "../contants/paymentConstants";

export const checkout = (amount, user) => async (dispatch) => {
  console.log(user);
  try {
    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const {
      data: { key },
    } = await axiosPaymentInstance.get("getkey");

    const { data } = await axiosPaymentInstance.post(
      `/checkout`,
      { amount },
      config
    );

    console.log(data);

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: data?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get worker",
      description: "Buy connects",
      image: "https://example.com/your_logo",
      order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:3001/api/credit/paymentVerification?userId=${tokenId._id}&amount=${data?.amount}&user=${user}`,
      prefill: {
        name: tokenId.name,
        email: tokenId.email,
        contact: "9447424094",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3ccf4e",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();

    // dispatch({
    //   type: MYJOBS_SUCCES,
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: MYJOBS_FAIL,
    //   error: error,
    // });
  }
};

export const myParchaseHistory = (amount) => async (dispatch) => {
  try {
    dispatch({
      type: PURCHASE_hISTORY_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosPaymentInstance.get(
      `/history/${tokenId._id}`,
      config
    );

    dispatch({
      type: PURCHASE_hISTORY_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_hISTORY_FAIL,
      error: error,
    });
  }
};
