const ContractSchema = mongoose.Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please enter a proper title for yor contract"],
  },
  description: {
    type: String,
    required: [true, "Please enter a proper Description for yor contract"],
  },
  rate: {
    type: Number,
    required: [true, "Please enter the rate for yor contract"],
  },
  category: {
    type: Array,
  },
  duration: {
    type: String,
    required: [true, "Please enter a proper duration for yor contract"],
  },
  level: {
    type: String,
    default: "easy",
    enum: ["easy", "medium", "hard"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
  proposals: [
    {
        type: Schema.Types.ObjectId,
        ref: "Proposal"
    }
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  }
});
