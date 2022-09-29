const { Order } = require("../Moduls/order.model");
const { Meals } = require("../Moduls/meals.model");
const { Restaurants } = require("../Moduls/rrestaurants.modul");

const getOrder = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: Meals,
          attributes: ["name", "price", "restaurantId", "status"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

const postOrder = async (req, res) => {
  try {
    const { sessionuser } = req;
    const { quantity, mealId } = req.body;
    const mealPrice = await Meals.findOne({
      where: { status: "active", id: mealId },
    });
    const total = mealPrice.price * quantity;
    if (!mealPrice) {
      return res.status(403).json({
        status: "Error",
        message: "The meal Id was not found",
      });
    }
    const createNewOrder = await Order.create({
      mealId,
      userId: sessionuser.id,
      totalPrice: total,
      quantity,
    });
    res.status(201).json({
      status: "Success",
      data: {
        createNewOrder,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { mealId, userId, quantity } = req.body;
    const { order } = req;
    const { sessionuser } = req;
    const total = mealPrice * quantity;
    await order.update({
      mealId,
      userId: sessionuser.id,
      quantity,
      totalPrice: total,
    });
    res.status(204).json({
      status: "Success",
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { order } = req;
    await order.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
};
