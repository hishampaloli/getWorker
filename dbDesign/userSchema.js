const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a username for your account"],
  },
  email: {
    type: String,
    required: [true, "Please enter a proper email address"],
    unique: true,
  },
  number: {
    type: Number,
    required: [true, "Please enter a valid mobile number to verify"],
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a strong password"],
  },
  location: {
    type: String,
  },
  totalEarned: {
    type: Number,
    default: 0,
  },
  languages: {
    type: Array,
    default: ["English"],
  },
  educations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Education",
    },
  ],
  skills: [],
  exprerience: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exprerience",
    },
  ],
  portfolio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  connects: {
    type: Number,
    default: 50,
  },
  userType: {
    type: String,
    default: "user",
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: "userInfo",
  },
  ratePerHour: {
    type: Number,
    default: 5,
  },
  workHistory: [],
  kyc: {
    type: Schema.Types.ObjectId,
    ref: "Kyc",
  },
  kycApproved: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  reported: {
    type: Number,
    default: 0,
  },
  activeContracts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contract",
    },
  ],
  myProposals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
});
