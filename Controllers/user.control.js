const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../Moduls/user.modul");
const { Reviews } = require("../Moduls/reviews.modul");
const { Order } = require("../Moduls/order.model");

const getUsersbyOrder = async (req, res) => {
  try {
    const user = await Users.findAll({
      attributes: { exclude: ["password", "createdAd", "updateAt"] },
      where: { status: "active" },
      include: [{ model: Order, attributes: ["quantity", "totalPrice"] }],
    });

    res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsersOrderbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: ["password", "createdAd", "updateAt"] },
      include: [{ model: Order, attributes: ["quantity", "totalPrice"] }],
      include: [{ model: Reviews, attributes: ["comment", "riting"] }],
    });
    if (!user) {
      return res.status(403).json({
        status: "Error",
        message: "The order was not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const postUsers = async (req, res) => {
  try {
    const { name, email, password, status, role } = req.body;

    //Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createNewUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      status,
      role,
    });
    createNewUser.password = undefined;
    res.status(201).json({
      status: "Success",
      data: {
        createNewUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { users } = req;
    await users.update({ name, email });
    res.status(204).json({
      status: "Error",
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { users } = req;
    await users.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await Users.findOne({ where: { email, status: "active" } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({
        status: "Error",
        message: "Wrong Credentials",
      });
    }
    //Remove password from Login
    user.password = undefined;

    //Generate Token
    const token = jwt.sign({ id: user.id }, "edge$1950+", { expiresIn: "30d" });

    res.status(200).json({
      status: "Success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsersbyOrder,
  getUsersOrderbyId,
  postUsers,
  updateUsers,
  deleteUsers,
  login,
};
