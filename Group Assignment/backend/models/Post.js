const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    max: 500
  },
  content: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  size: {
    type: Number
  },
  condition: {
    type: String
  },
  post_status: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
    default: ""
  },
  likes: {
    type: Array,
    default: []
  },
  boughtPerson: {
    type: mongoose.Types.ObjectId,
    default: null
  }
}, { timestamps: true })


module.exports = mongoose.model("Post", PostSchema);