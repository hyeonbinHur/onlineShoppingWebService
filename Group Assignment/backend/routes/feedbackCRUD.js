const router = require("express").Router();
const mongoose = require('mongoose');
const Feedback = require("../models/Feedback");

//create feedback
router.post("/create", async (req, res) => {
  try {

    const newFeedback = new Feedback({
      content: req.body.content,
      userId: req.body.userId,
      postId: req.body.postId,
      img: req.body.img
    });
    const savedFeedback = await newFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (err) {
    res.status(500).json(err);
  }
})


//update comment
router.put("/update/:id", async (req, res) => {
  try {
    //check to see if the user ID match
    const feedback = await Feedback.findById(req.params.id);
    if (feedback.userId === req.body.userId) {
      await feedback.updateOne({ $set: req.body });
      res.status(200).json("feedback updated");
    } else {
      res.status(403).json("you can update your feedback only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})


//delete comment
router.delete("/delete/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    //check to see if the user ID match
    if (feedback.userId === req.body.userId) {
      await feedback.deleteOne();
      res.status(200).json("feedback deleted");
    } else {
      res.status(403).json("you can delete your feedback only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

//fetch all feedback in for a single post
router.get("/getFeedbacks/:post_id", async (req, res) => {
  Feedback.aggregate([
    { $match: { postId: mongoose.Types.ObjectId(req.params.post_id) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users"
      }
    },
    {
      $project: {
        postId: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        content: 1,
        "users.username": 1,
        "users.profilePicture": 1
      }
    },
  ]).exec((error, data) => {
    if (error) {
      console.log(error)
      return res.send([])
    } else {
      return res.send(data)
    }
  })
})

module.exports = router


