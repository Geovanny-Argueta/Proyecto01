const { Users } = require("../Moduls/user.modul");

const usersExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await Users.findOne({ where: { id } });

    //If the users does not exists
    if (!users) {
      return res.status(404).json({
        status: "Error",
        message: "The user was not found",
      });
    }
    req.users = users;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { usersExists };
