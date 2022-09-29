const { body, validationResult } = require("express-validator");

const checkValidator = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const errorMessages = error.array().map((err) => err.msg);
    const message = errorMessages.join(". ");
    return res.status(400).json({
      status: "Error",
      message,
    });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters"),
  checkValidator,
];

const createMealsValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price cannot be empty"),
  body("restaurantId")
    .isNumeric()
    .withMessage("RestaurantId must be a number")
    .notEmpty()
    .withMessage("RestaurantId cannot be empty"),
  checkValidator,
];

const createOrderValidator = [
  body("mealId")
    .isNumeric()
    .withMessage("MealId must be a number")
    .notEmpty()
    .withMessage("MealId cannot be empty"),
  body("userId")
    .isNumeric()
    .withMessage("userId must be a number")
    .notEmpty()
    .withMessage("userId cannot be empty"),
  body("quantity")
    .isNumeric()
    .withMessage("quantity must be a number")
    .notEmpty()
    .withMessage("quantity cannot be empty"),
  checkValidator,
];

const createReviewsValidator = [
  body("userId")
    .isNumeric()
    .withMessage("userId must be a number")
    .notEmpty()
    .withMessage("userId cannot be empty"),
  body("comment")
    .isString()
    .withMessage("comment must be a string")
    .notEmpty()
    .withMessage("comment cannot be empty"),
  body("restaurantId")
    .isNumeric()
    .withMessage("restaurantId must be a number")
    .notEmpty()
    .withMessage("restaurantId cannot be empty"),
  body("riting")
    .isNumeric()
    .withMessage("riting must be a number")
    .notEmpty()
    .withMessage("riting cannot be empty"),
  checkValidator,
];

const createRestaurantsValidato = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("address")
    .isString()
    .withMessage("address must be a string")
    .notEmpty()
    .withMessage("address cannot be empty"),
  body("rating").notEmpty().withMessage("rating cannot be empty"),
  checkValidator,
];

module.exports = {
  createRestaurantsValidato,
  createReviewsValidator,
  createOrderValidator,
  createMealsValidator,
  createUserValidators,
};
