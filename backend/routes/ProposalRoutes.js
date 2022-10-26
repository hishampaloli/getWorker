import express from "express";
import {
  acceptProposal,
  myProposals,
  submitProposal,
  updateProposal,
  viewProposal,
} from "../controllers/proposalController.js";

import {
  isEmployer,
  isOwner,
  protect,
  isEmployee,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/proposal/:userId/:id")
  .post(protect, isOwner, isEmployee, submitProposal);

router.route("/viewProposal/:id").get(protect, viewProposal);

router
  .route("/updateProposal/:userId/:id")
  .patch(protect, isOwner, isEmployer, updateProposal);

router
  .route("/myProposals/:userId")
  .get(protect, isOwner, isEmployee, myProposals);

router.route("/acceptProposal/:userId/:id").post(protect, acceptProposal);

export default router;
