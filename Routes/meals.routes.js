const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getMeals,
  getMealsbyId,
  postMeals,
  updateMeals,
  deleteMeals,
} = require("../Controllers/meal.control");

const { mealsExists } = require("../Middleware/meals.middleware");
const { createMealsValidator } = require("../Middleware/validator.middleware");
const { protecSession } = require("../Middleware/auth.middleware");

const mealRouetes = express.Router();
mealRouetes.get("/", getMeals);
mealRouetes.get("/:id", getMealsbyId);

mealRouetes.use(protecSession);
mealRouetes.post("/", createMealsValidator, postMeals);
mealRouetes.patch("/:id", mealsExists, updateMeals);
mealRouetes.delete("/:id", mealsExists, deleteMeals);

module.exports = { mealRouetes };
