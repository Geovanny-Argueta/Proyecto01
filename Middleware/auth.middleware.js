const { Users } = require("../Moduls/user.modul");
const jwt = require("jsonwebtoken");

const protecSession = async (req, res, next) => {
  try {
    //Get the token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //Extract token
      token = req.headers.authorization.split(" ")[1];
    }
    //Check if the token was sent
    if (!token) {
      return res.status(403).json({
        status: "Error",
        message: "Invalid Session",
      });
    }

    //Verify the token
    const decoded = jwt.verify(token, "edge$1950+");

    //Verify the tokens owner
    const authUser = await Users.findOne({
      where: { id: decoded.id, status: "active" },
    });
    //and if is not verify send a error message
    if (!authUser) {
      return res.status(403).json({
        status: "Error",
        message: "The owner of the session in not longer active",
      });
    }
    req.sessionuser = authUser;
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectAccount = async (req, res, next) => {
  try {
    const { sessionuser, users } = req;

    if (sessionuser.id !== users.id) {
      return res.status(403).json({
        status: "Error",
        message: "You are not the owner",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  protecSession,
  protectAccount,
};
