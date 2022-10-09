import express from "express";
import {
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
  .patch(protect, isOwner, isEmployee, myProposals);

export default router;
