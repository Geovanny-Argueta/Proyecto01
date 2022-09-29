const { Meals } = require("../Moduls/meals.model");
const { Order } = require("../Moduls/order.model");
const { Restaurants } = require("../Moduls/rrestaurants.modul");

const getMeals = async (req, res) => {
  try {
    const meals = await Meals.findAll({
      include: [
        {
          model: Order,
          attributes: ["totalPrice", "quantity", "status"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      data: { meals },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const orderId = await Order.findOne({
      where: { id },
      include: [
        {
          model: Order,
          attributes: ["totalPrice", "quantity", "status"],
        },
      ],
    });
    if (!orderId) {
      return res.status(403).json({
        status: "Error",
        message: "The Meal Id was not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        orderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const postMeals = async (req, res) => {
  try {
    const { id } = req.sessionuser;
    const { name, price } = req.body;
    const createNewMeals = await Meals.create({
      name,
      price,
      restaurantId: id,
    });
    res.status(201).json({
      status: "Success",
      data: {
        createNewMeals,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMeals = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { meals } = req;
    await meals.update({ name, price });
    res.status(204).json({
      status: "Error",
      data: { meals },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeals = async (req, res) => {
  try {
    const { meals } = req;
    await meals.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMeals,
  getMealsbyId,
  postMeals,
  updateMeals,
  deleteMeals,
};
