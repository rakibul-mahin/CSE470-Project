const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      default: "",
    },
    like: {
      type: Array,
    },
    dislike: {
      type: Array,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        userimage: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
