const Comment = require("../Models/CommentsModel");

const getCommentsByMovieId = async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).sort({
      createdAt: -1,
    });

    if (!comments.length) {
      return res.status(404).json([]);
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json([]);
  }
};

const createComment = async (req, res) => {
  try {
    const { movieId, userEmail, text } = req.body;

    if (!movieId || !userEmail || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({ movieId, userEmail, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userEmail } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userEmail !== userEmail) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentsByMovieId,
  createComment,
  deleteComment,
};
