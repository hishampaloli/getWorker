const ProposalSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coverLetter: {
    type: String,
    required: [true, "Please enter a cover letter"],
  },
  price: {
    type: Number,
    required: true,
  },
  duraction: {
    type: String,
    required: true,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: "Contract"
  }
});
