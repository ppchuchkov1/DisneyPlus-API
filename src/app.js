require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const moviesRoutes = require("./Routes/MoviesRoutes");
const userRoutes = require("./Routes/UserRoutes");
const commentsRoutes = require("./Routes/CommentsRoutes");
const categoriesRoutes = require("./Routes/CategoriesRoutes");

const connectMongoDB = require("./connections/mongo");

const app = express();
const PORT = 5001;
const server = http.createServer(app);

// MongoDB connection
connectMongoDB();

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
app.use("/api/movies", moviesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/categories", categoriesRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
