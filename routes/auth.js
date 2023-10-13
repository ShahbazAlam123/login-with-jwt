const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");

router.post("/create", auth, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: hashedPassword,
    });
    const users = await newUser.save();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  let token;
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "password Incorrect" });
    }
    // res.status(200).json(data);
    //token creation
    token = jwt.sign({ data }, process.env.TOKEN_KEY, { expiresIn: "1h" });
    if (!token) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
});
//update the user
router.put("/update/:id", auth, async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(400).json(error);
      }
    }
    try {
      const updatedData = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated Succesfully");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("you can update only your profile");
  }
});

//delete the user

router.delete("/delete/:id", auth, async (req, res) => {
  if (req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Deleted");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("you can only delete yours account");
  }
});

//get all user list

router.get("/allUsers", auth, async (req, res) => {
  try {
    const data = await User.find().sort({ $natural: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
