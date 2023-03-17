const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, username, email, password, repassword } =
        req.body;

      if (password != repassword) {
        return res.status(400).json({ msg: "Password did not match" });
      }

      const check_username = await User.findOne({ username: username });
      if (check_username) {
        return res.status(400).json({ msg: "Username Already in Use!!!" });
      }

      const check_email = await User.findOne({ email: email });
      if (check_email) {
        return res.status(400).json({ msg: "Email Already in Use!!!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: hashedPassword,
      });

      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      await user.save();
      res.status(200).json({ msg: "User Registered", user, accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist!!!" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ msg: "Wrong Credentials" });
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        msg: "login Successful!!!",
        accessToken,
        user: { ...user._doc, password: "" },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserDetail: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ msg: "User not Found" });
      }

      const { email, password, followers, following, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserNotification: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ msg: "User not Found" });
      }
      res.status(200).json(user.notifications);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
