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
          // const creator = await User.findById(post.user);
          const follow_notification = {
            user: otheruser._id,
            username: otheruser.username,
            userimage: otheruser.userimage,
            postimg: user.userimage,
            type: "started following you",
          };
          user.notifications.push(follow_notification);
          await user.save();
          console.log(follow_notification);
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
      const page = req.query.page || 1;
      const limit = req.query.limit || 3;
      const startIndex = (page - 1) * limit;
      const user = await User.findById(req.params.id);
      const followerPost = await Promise.all(
        user.following.map((item) => {
          return Post.find({ user: item }).skip(startIndex).limit(limit);
        })
      );
      res.status(200).json(followerPost);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  suggestFollower: async (req, res) => {
    try {
      const allUser = await User.find();
      const user = await User.findById(req.user.id);
      const followingUser = await Promise.all(
        user.following.map((item) => {
          return item;
        })
      );
      let UserToFollow = allUser.filter((val) => {
        return !followingUser.find((item) => {
          return val._id.toString() === item;
        });
      });

      let filterUser = await Promise.all(
        UserToFollow.map((item) => {
          return item;
        })
      );

      res.status(200).json(filterUser);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  allFollowing: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const followingUser = await Promise.all(
        user.following.map((item) => {
          return User.findById(item);
        })
      );
      let followingList = [];
      followingUser?.map((person) => {
        followingList.push(person);
      });
      res.status(200).json(followingList);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  allFollower: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const followerUser = await Promise.all(
        user.followers.map((item) => {
          return User.findById(item);
        })
      );
      let followerList = [];
      followerUser?.map((person) => {
        followerList.push(person);
      });
      res.status(200).json(followerList);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
