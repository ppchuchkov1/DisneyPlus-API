const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      ref: "Movie",
      required: true,
    },
    userEmail: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
