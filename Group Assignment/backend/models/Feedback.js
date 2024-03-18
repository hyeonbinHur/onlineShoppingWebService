const mongoose = require("mongoose");


const FeedbackSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "posts"
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  content: {
    type: String,
    default: ""
  },
  img: {
    type: String
  }
}, { timestamps: true })


module.exports = mongoose.model("Feedback", FeedbackSchema);