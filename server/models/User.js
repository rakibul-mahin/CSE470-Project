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
        "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
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
