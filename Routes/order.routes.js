const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
} = require("../Controllers/order.control");

const { orderExists } = require("../Middleware/order.middleware");
const { createOrderValidator } = require("../Middleware/validator.middleware");
const { protecSession } = require("../Middleware/auth.middleware");

const orderRoutes = express.Router();
orderRoutes.use(protecSession);
orderRoutes.get("/", getOrder);
orderRoutes.post("/", createOrderValidator, postOrder);
orderRoutes.patch("/:id", orderExists, updateOrder);
orderRoutes.delete("/:id", orderExists, deleteOrder);

module.exports = { orderRoutes };
