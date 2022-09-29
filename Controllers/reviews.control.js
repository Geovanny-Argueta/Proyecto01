const { Reviews } = require("../Moduls/reviews.modul");

const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll();
    res.status(200).json({
      status: "Success",
      data: { reviews },
    });
  } catch (error) {
    console.log(error);
  }
};

const postReviews = async (req, res) => {
  try {
    const { comment, riting } = req.body;
    const { sessionuser } = req;
    const createNewReviews = await Reviews.create({
      userId: sessionuser.id,
      comment,
      restaurantId: sessionuser.id,
      riting,
    });
    res.status(201).json({
      status: "Success",
      data: {
        createNewReviews,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReviews = async (req, res) => {
  try {
    const { userId, comment, restaurantId, riting } = req.body;
    const { reviews } = req;
    await reviews.update({ userId, comment, restaurantId, riting });
    res.status(204).json({
      status: "Error",
      data: { reviews },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteReviews = async (req, res) => {
  try {
    const { reviews } = req;
    await reviews.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReviews,
  postReviews,
  updateReviews,
  deleteReviews,
};
