const Category = require("../Models/CategoriesModel");
const Movie = require("../Models/MoviesModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.set("Cache-Control", "no-store");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json([]);
  }
};

const getMoviesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const movies = await Movie.find({ categoryIds: categoryId });
    if (!movies.length) {
      return res.status(404).json([]);
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json([]);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
};

const getLikedMoviesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const movies = await Movie.find({ likedBy: email });

    if (!movies.length) {
      return res.status(404).json([]);
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error searching for movies" });
  }
};

module.exports = {
  getAllCategories,
  getMoviesByCategoryId,
  createCategory,
  getLikedMoviesByEmail,
};
