const { Restaurants } = require("../Moduls/rrestaurants.modul");

const restaurantsExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurants = await Restaurants.findOne({ where: { id } });

    //If the users does not exists
    if (!restaurants) {
      return res.status(404).json({
        status: "Error",
        message: "The user was not found",
      });
    }
    req.restaurants = restaurants;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { restaurantsExists };
