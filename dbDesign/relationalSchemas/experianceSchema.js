const exprerienceSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please add a title for your experiance"]
  },
  description: {
    type: String,
    required: [true, "Please add a short description"]
  }
});
