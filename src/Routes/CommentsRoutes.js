const express = require("express");
const {
  getCommentsByMovieId,
  createComment,
  deleteComment,
} = require("../Controllers/CommentsControllers");

const router = express.Router();

router.get("/:movieId", getCommentsByMovieId);
router.post("/create", createComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
