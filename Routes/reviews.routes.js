const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getReviews,
  postReviews,
  updateReviews,
  deleteReviews,
} = require("../Controllers/reviews.control");

const { reviewsExists } = require("../Middleware/reviews.middleware");
const {
  createReviewsValidator,
} = require("../Middleware/validator.middleware");
const { protecSession } = require("../Middleware/auth.middleware");

const reviewsRoutes = express.Router();

reviewsRoutes.use(protecSession);

reviewsRoutes.get("/", getReviews);
reviewsRoutes.post("/", createReviewsValidator, postReviews);
reviewsRoutes.patch("/:id", reviewsExists, updateReviews);
reviewsRoutes.delete("/:id", reviewsExists, deleteReviews);

module.exports = { reviewsRoutes };
