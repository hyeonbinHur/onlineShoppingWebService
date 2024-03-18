const router = require("express").Router();
const User = require("../models/User.js");

const bcrypt = require("bcrypt");


//SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const find = await User.find({username: req.body.username });
    if (find.length > 0) {
      return res.status(400).json({ message: "user exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      phone_num: req.body.phone_num,
      credit_card_num: req.body.credit_card_num,
      gender: req.body.gender,
      DoB: req.body.DoB
    })
    const user = newUser.save();
    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).json({ err: err });
  }
});



//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("invalid password");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err, status: "failed" });
  }
})




module.exports = router
