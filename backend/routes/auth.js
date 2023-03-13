const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "PrivateTokenStringForSignature";

//Create a User Using POST "/api/auth/createuser" Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be more than 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // If error , return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      // Check Whther User is Exist or Not
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email are already exists" });
      }
      // Make Privacy to Password with Salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = { user: { id: user.id } };
      // Assign Token for Authentication
      const authotoken = jwt.sign(data, JWT_SECRET);
      res.json({ authotoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error occured");
    }
  }
);

// Route 2: Authenticate User
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can't blanck").exists({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get email and password from the request body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try with correnct Credentisals" });
      }

      // Compare Password with Bcrypted Password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try with correnct Credentisals" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      // Assign Token for Authentication
      const authotoken = jwt.sign(data, JWT_SECRET);
      res.json({ authotoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error occured");
    }
  }
);

// Route 3: Login User details using: POST "/api/auth/getuser". Login require
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
