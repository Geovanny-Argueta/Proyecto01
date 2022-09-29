const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getUsersbyOrder,
  getUsersOrderbyId,
  postUsers,
  updateUsers,
  deleteUsers,
  login,
} = require("../Controllers/user.control");

const { usersExists } = require("../Middleware/user.middleware");
const { createUserValidators } = require("../Middleware/validator.middleware");
const {
  protecSession,
  protectAccount,
} = require("../Middleware/auth.middleware");

const userRouetes = express.Router();

userRouetes.post("/signup", createUserValidators, postUsers);
userRouetes.post("/login", login);

//Protecting belows EndPoints
userRouetes.use(protecSession);
userRouetes.get("/orders", getUsersbyOrder);
userRouetes.get("/orders/:id", getUsersOrderbyId);
userRouetes.patch("/:id", usersExists, protectAccount, updateUsers);
userRouetes.delete("/:id", usersExists, protectAccount, deleteUsers);

module.exports = { userRouetes };
