const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  follow: async (req, res) => {
    try {
      if (req.params.id !== req.body.user) {
        const user = await User.findById(req.params.id); //This is the user that I want to follow
        const otheruser = await User.findById(req.body.user); //This is the logged in user

        if (!user.followers.includes(req.body.user)) {
          await user.updateOne({ $push: { followers: req.body.user } });
          await otheruser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json({ msg: "User Has Followed" });
        } else {
          return res
            .status(400)
            .json({ msg: "You are already following this user" });
        }
      } else {
        return res.status(400).json({ msg: "You cannot follow yourself" });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  followerPost: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const followerPost = await Promise.all(
        user.following.map((item) => {
          return Post.find({ user: item });
        })
      );
      res.status(200).json(followerPost);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
