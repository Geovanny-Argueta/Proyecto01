const { Order } = require("../Moduls/order.model");

const orderExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });

    //If the users does not exists
    if (!order) {
      return res.status(404).json({
        status: "Error",
        message: "The user was not found",
      });
    }
    req.order = order;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { orderExists };
