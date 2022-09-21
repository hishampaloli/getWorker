const educationSchema = mongoose.Scheme({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  school: {
    type: String,
  },
  title: {
    type: String
  },
  period: {
    type: String
  }
});

