import { instance } from "../server.js";
import crypto from "crypto";
import AsyncHandler from "express-async-handler";
import Employee from "../models/employeeModal.js";
import Purchase from "../models/purchaseModal.js";
import Admin from "../models/adminModel.js";
import Employer from "../models/employerModel.js";

export const getkey = async (req, res) => {
  res.status(200).json({ key: "rzp_test_7wPhwS45ZkJnjR" });
};

export const checkout = AsyncHandler(async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    res.json(order);
  });
});

export const paymentVerification = AsyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const { userId, amount, user } = req.query;
  const amnt = amount / 100;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "KxL3P87LVayeD69Aav20mHjU")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  const admin = await Admin.findById("633be9b307ec8a154a57bc9e");

  if (isAuthentic) {
    const purchase = await Purchase.findOne({ owner: userId });
    if (purchase) {
      purchase.details.push({
        amount: amnt,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
      await purchase.save();
    } else {
      const purch = new Purchase({
        owner: userId,
        details: {
          amount: amnt,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      });
      await purch.save();
    }

    if (user === "employee") {
      const employee = await Employee.findOne({ owner: userId });

      employee.connects = employee.connects + amnt / 5;
      admin.balance = admin.balance + amnt;
      admin.soldConnect = admin.soldConnect + amnt / 5;
      await employee.save();
      await admin.save();

      res.redirect(`http://localhost:3000`);
    } else {
      const employer = await Employer.findOne({ owner: userId });

      employer.balance = employer.balance + amnt;
      admin.balance = admin.balance + amnt;
      await employer.save();
      await admin.save();

      res.redirect(`http://localhost:3000`);
    }
  } else {
    res.json({ success: false });
  }
});

export const myParchaseHistory = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Purchase.findOne({ owner: userId });

    res.json(history);
  } catch (error) {
    req.status(404);
    throw new Error(error);
  }
});
