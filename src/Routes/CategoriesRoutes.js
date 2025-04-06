const express = require("express");
const {
  getAllCategories,
  createCategory,
  getMoviesByCategoryId,
  getLikedMoviesByEmail,
} = require("../Controllers/CategoriesControllers");

const router = express.Router();

router.get("/", getAllCategories);
router.post("/create", createCategory);
router.get("/:categoryId/movies", getMoviesByCategoryId);
router.get("/liked/:email", getLikedMoviesByEmail);

module.exports = router;
