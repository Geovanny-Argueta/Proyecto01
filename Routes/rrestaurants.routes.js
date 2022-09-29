const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getRestaurants,
  getRestaurantsbyId,
  postRestaurants,
  updateRestaurants,
  deleteRestaurants,
  postReviewsRestaurantId,
  updateReviewsId,
  deleteReviewsId,
} = require("../Controllers/rrestaurants.control");

const { restaurantsExists } = require("../Middleware/rrestaurants.middleware");
const { reviewsExists } = require("../Middleware/reviews.middleware");
const {
  createRestaurantsValidato,
  createReviewsValidator,
} = require("../Middleware/validator.middleware");
const { protecSession } = require("../Middleware/auth.middleware");

const restaurantsRouetes = express.Router();
restaurantsRouetes.get("/", getRestaurants);
restaurantsRouetes.get("/:id", getRestaurantsbyId);

restaurantsRouetes.use(protecSession);
restaurantsRouetes.post("/", createRestaurantsValidato, postRestaurants);
restaurantsRouetes.patch("/:id", restaurantsExists, updateRestaurants);
restaurantsRouetes.delete("/:id", restaurantsExists, deleteRestaurants);
restaurantsRouetes.post(
  "/reviews/:restaurantId",
  reviewsExists,
  createReviewsValidator,
  postReviewsRestaurantId
);
restaurantsRouetes.patch("/reviews/:id", reviewsExists, updateReviewsId);
restaurantsRouetes.delete("/reviews/:id", reviewsExists, deleteReviewsId);
module.exports = { restaurantsRouetes };
