const employeeSchema = mongoose.Schema({
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
  totalSpend: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
    default: "employee",
  },
  contractsPosted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contract",
    },
  ],
  hires: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
