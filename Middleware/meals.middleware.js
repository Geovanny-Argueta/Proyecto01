const { Meals } = require("../Moduls/meals.model");

const mealsExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meals = await Meals.findOne({ where: { id } });

    //If the users does not exists
    if (!meals) {
      return res.status(404).json({
        status: "Error",
        message: "The user was not found",
      });
    }
    req.meals = meals;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { mealsExists };
