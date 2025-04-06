const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryIds: [{ type: String, ref: "Category", required: true }],
    videoUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
