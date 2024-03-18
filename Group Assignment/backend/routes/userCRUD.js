const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//get 1 user
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    //create the user._doc
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
})


//update 1 user
router.put("/update/:id", async (req, res) => {
  if (req.body.userId === req.params._id || req.body.isAdmin) {
    //if the user want to update the password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        //update the req.body.password
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      //update the user
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json("Account updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only perform update on your account");
  }
})

//delete 1 user
router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    try {
      //delete the user
      const user = await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Account deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only perform delete on your account");
  }
})

//follow an user
router.put("follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //get the user that we want to follow
      const user = await User.findById(req.params.id);
      //get the current user
      const currentUser = User.findById(req.body.userId);
      //perform the follow update
      if (!user.followers.includes(req.body.userUd)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.body.userId } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("This account is already followed by you")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
})

//unfollow an user
router.put("unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //get the user that we want to unfollow
      const user = await User.findById(req.params.id);
      //get the current user
      const currentUser = User.findById(req.body.userId);
      //perform the unfollow update
      if (user.followers.includes(req.body.userUd)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.body.userId } });
        res.status(200).json("User unfollowed");
      } else {
        res.status(403).json("This account is already unfollowed by you")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
})


module.exports = router
