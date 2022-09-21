const portfolioSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: [true, "Please add a Image"]
  },
  title: {
    type: String,
    required: [true, "Please add a title for your portfoilio"]
  },
  description: {
    type: String,
    required: [true, "Please add a detailed description"]
  }

});
