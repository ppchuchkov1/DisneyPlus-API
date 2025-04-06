const express = require("express");
const {
  getAllMovies,
  getMovieById,
  likeMovie,
  unlikeMovie,
} = require("../Controllers/MoviesControllers");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/:movieId/like", likeMovie);
router.post("/:movieId/unlike", unlikeMovie);

module.exports = router;
