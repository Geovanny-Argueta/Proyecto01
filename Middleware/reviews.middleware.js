const { Reviews } = require("../Moduls/reviews.modul");

const reviewsExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await Reviews.findOne({ where: { id } });

    //If the users does not exists
    if (!reviews) {
      return res.status(404).json({
        status: "Error",
        message: "The user was not found",
      });
    }
    req.reviews = reviews;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reviewsExists };
