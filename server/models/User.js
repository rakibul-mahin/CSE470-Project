const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 25,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 25,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userimage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
    },
    coverimage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    },
    mobile: {
      type: String,
      default: "",
      maxlength: 11,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
    notifications: {
      type: Array,
    },
    bio: {
      type: String,
      default: "I am ...",
    },
    address: {
      type: String,
      default: "",
    },
    gameprofile: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
