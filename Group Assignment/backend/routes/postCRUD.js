const router = require("express").Router();
const Post = require("../models/Post");
const mongoose = require("mongoose");

//create post
router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
})

//update post
// router.put("/update/:id", async (req, res) => {
//   try {
//     //check to see if the user ID match
//     const post = await Post.findById(req.params.id);
//     if (post.userId === req.body.userId) {
//       await post.updateOne({ $set: req.body });
//       ree.status(200).json("post updated");
//     } else {
//       res.status(403).json("you can update your post only");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })
router.put("/update/:id", async (req, res) => {
  try {
    //check to see if the user ID match
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $set: req.body });
    res.status(200).json("post updated");


  } catch (err) {
    res.status(500).json(err);
  }
})


//delete post
router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check to see if the user ID match
  
      await post.deleteOne();
      res.status(200).json("post deleted");
    
  } catch (err) {
    res.status(500).json(err);
  }
})

//like and unlike post
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let value = true
    //check if the post likes field includes userId
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      // return res.status(200).json(true);
      value = true
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      // return res.status(200).json(false);
      value = false
    }
    res.status(200).json(value)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }

})

//get 1 post
router.get("/getPost/:id", async (req, res) => {
  Post.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
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
        title: 1,
        content: 1,
        size: 1,
        price: 1,
        post_status: 1,
        condition: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        likes: 1,
        img: 1,
        tags: 1,
        views: 1,
        comments: 1,
        "users.username": 1,
        "users.profilePicture": 1
      }
    }

  ]).exec((error, data) => {
    if (error) {
      console.log(error)
      return res.send([])
    } else {
      return res.send(data[0])
    }
  })
})

//get all posted posts for one user
router.get("/getPosts/:user_id", async (req, res) => {
  Post.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.params.user_id) } },
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
        title: 1,
        content: 1,
        size: 1,
        price: 1,
        post_status: 1,
        condition: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        likes: 1,
        img: 1,
        tags: 1,
        views: 1,
        comments: 1,
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
//get all sold posts for one user 
router.get("/getSoldPosts/:user_id", async (req, res) => {
  Post.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.params.user_id), post_status: false } },
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
        title: 1,
        content: 1,
        size: 1,
        price: 1,
        post_status: 1,
        condition: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        likes: 1,
        img: 1,
        tags: 1,
        views: 1,
        comments: 1,
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

//get all NOT sold posts for one user 
router.get("/getNotSoldPosts/:user_id", async (req, res) => {
  Post.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.params.user_id), post_status: true } },
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
        title: 1,
        content: 1,
        size: 1,
        price: 1,
        post_status: 1,
        condition: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        likes: 1,
        img: 1,
        tags: 1,
        views: 1,
        comments: 1,
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
//get all bought post for one user 
router.get("/getBoughtPosts/:user_id", async (req, res) => {
  Post.aggregate([
    { $match: { boughtPerson: mongoose.Types.ObjectId(req.params.user_id), post_status: false } },
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
        title: 1,
        content: 1,
        size: 1,
        price: 1,
        post_status: 1,
        condition: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        likes: 1,
        img: 1,
        tags: 1,
        views: 1,
        comments: 1,
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


// //get post of users that you followed and your posts (postType=post)
// router.get("/timeline", async (req,res) => {
//   try {
//     const currentuser = await User.findById(req.body.userId);
//     const userPosts = await Post.find({userId: currentUser._id});
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         Post.find({userId: friendId});
//       })
//     );
//     res.status(200).json(userPosts.concat(...friendPosts));
//   }catch(err) {
//     res.status(500).json(err);
//   }
// })

// get posts from a pages
router.get("/getPage", async (req, res) => {
  try {
    var posts = null

    if (req.query?.sort === "default") {
      posts = await Post.find({})
        .skip((+req.query.page - 1) * 3)
        .limit(3);
    } else {
      console.log("REACH", req.query.order, req.query.sort)
      posts = await Post.find({})
        .sort({ [req.query.sort]: req.query.order === "true" ? 1 : - 1 })
        .skip((+req.query.page - 1) * 3)
        .limit(3);
    }

    for (let i = 0; i < posts.length; i++) {
      posts[i].likes = posts[i].likes.length
    }

    const count = await Post.find({}).count()
    return res.status(200).json({ posts, count });
  } catch (err) {
    res.status(500).json(err);
  }
})

// router.get("/:post_type/search", async (req, res) => {
//   try {
//     var posts;
//     var length;
//     if (req.query?.tag) {
//       const text = req.query.tag;
//       const tag = text.replace(/_/g, ' ');
//       posts = await Post.find({ "postType": req.params.post_type, tags: { $all: tag } })
//         .skip((+req.query.page - 1) * 3)
//         .limit(3);
//       length = await Post.find({ "postType": req.params.post_type, tags: { $all: tag } })
//         .count()
//     } else if (req.query?.name) {
//       var text = req.query.name;
//       text = text.replace(/_/g, ' ');
//       posts = await Post.find({ "postType": req.params.post_type, $text: { $search: text } })
//         .skip((+req.query.page - 1) * 3)
//         .limit(3);
//       length = await Post.find({ "postType": req.params.post_type, $text: { $search: text } })
//         .count()
//     }
//     return res.status(200).json({ posts, count: length })
//   } catch (err) {
//     return res.status(500)
//   }
// })


//get all posts
//api = http://localhost:8000/api/post/posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", ["username", "profilePicture"]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})
//search by seller
//api = http://localhost:8000/api/post/Searchposts/645884e15e6ed2b1f0837015
router.get("/Searchposts/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const posts = await Post.find({ userId }).populate("userId", ["username", "profilePicture"]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router