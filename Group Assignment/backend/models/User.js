const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 25,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    require: true,
    min: 5,
    max: 100,
    unique: true
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 30,
  },
  profilePicture: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    max: 50,
    default: ""
  },
  phone_num: {
    type: String,
    max: 50,
    default: ""
  },
  credit_card_num: {
    type: String,
    max: 50,
    default: ""
  },
  gender: {
    type: String,
    max: 50,
    default: ""
  },
  DoB: {
    type: String,
    default: ""
  },
  posts_liked: {
    type: Array,
    default: []
  },
  buyers_Id: {
    type: Array,
    default: []
  },
  sold_posts: {
    type: Array,
    default: []
  },
  bought_posts: {
    type: Array,
    default: []
  },
  feedbacks: {
    type: Array,
    default: []
  },
}, { timestamps: true })


module.exports = mongoose.model("User", UserSchema);