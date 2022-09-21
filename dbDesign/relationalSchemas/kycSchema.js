const kycSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      aatharImage: {
        type: String,
        required: [true, "Please add a aathar card"]
      },
      aatharSelfie: {
        type: String,
        required: [true, "Please add a aathar selfie"]
      },
      panImage: {
        type: String,
        required: [true, "Please add a pan card"]
      },
      yourImage: {
        type: String,
        required: [true, "Please add your passport size photo"]
      },
      gstNumber: {
        type: String,
        required: [true, "Please add your gst number"]
      }
})