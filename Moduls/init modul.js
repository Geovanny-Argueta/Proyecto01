//Moduls
const { Meals } = require("../Moduls/meals.model");
const { Order } = require("../Moduls/order.model");
const { Reviews } = require("../Moduls/reviews.modul");
const { Restaurants } = require("../Moduls/rrestaurants.modul");
const { Users } = require("../Moduls/user.modul");

const initModels = () => {
  //Restaurants
  Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);

  Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants);

  Users.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(Users);

  Meals.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meals);

  Users.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(Users);
};

module.exports = { initModels };
