const Movie = require("../Models/MoviesModel");
const User = require("../Models/UserModel");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.set("Cache-Control", "no-store");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json([]);
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json([]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json([]);
  }
};

const likeMovie = async (req, res) => {
  try {
    const { email } = req.body;
    const { movieId } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.likedBy && movie.likedBy.includes(email)) {
      return res.status(400).json({ message: "You already liked this movie" });
    }

    movie.likes += 1;
    movie.likedBy = movie.likedBy || [];
    movie.likedBy.push(email);
    await movie.save();

    return res.status(200).json({
      message: "The movie has been liked successfully",
      likes: movie.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unlikeMovie = async (req, res) => {
  try {
    const { email } = req.body;
    const { movieId } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!movie.likedBy || !movie.likedBy.includes(email)) {
      return res.status(400).json({ message: "You didn't like this movie" });
    }

    movie.likes -= 1;
    movie.likedBy = movie.likedBy.filter((userEmail) => userEmail !== email);
    await movie.save();

    return res.status(200).json({
      message: "Like successfully removed",
      likes: movie.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  likeMovie,
  unlikeMovie,
};
