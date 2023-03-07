const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User Using POST "/api/auth/createuser" Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be more than 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If error , return Bad request and the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check User is exit of not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email are already exists" });
      }
      // Create a new User
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

module.exports = router;
