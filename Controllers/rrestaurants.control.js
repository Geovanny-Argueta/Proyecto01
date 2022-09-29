const { Restaurants } = require("../Moduls/rrestaurants.modul");
const { Reviews } = require("../Moduls/reviews.modul");
const { Meals } = require("../Moduls/meals.model");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurants.findAll({
      where: { status: "active" },
      include: [{ model: Reviews, attributes: ["comment", "riting"] }],
      include: [
        {
          model: Meals,
          attributes: ["name", "price", "status"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      data: { restaurants },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantsbyId = async (req, res) => {
  try {
    const { id } = req;
    const restaurant = await Restaurants.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [{ model: Reviews, attributes: ["comment", "riting"] }],
      include: [
        {
          model: Meals,
          attributes: ["name", "price", "status"],
        },
      ],
    });
    if (!restaurant) {
      return res.status(403).json({
        status: "Error",
        message: "The Restaurant ID was not found",
      });
    }
    res.status(200).json({
      status: "Error",
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const postRestaurants = async (req, res) => {
  try {
    const { name, address, rating } = req.body;
    const createNewRestaurant = await Restaurants.create({
      name,
      address,
      rating,
    });
    res.status(201).json({
      status: "Success",
      data: {
        createNewRestaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurants = async (req, res) => {
  try {
    const { name, address, rating, status } = req.body;
    const { restaurants } = req;
    await restaurants.update({ name, address, rating, status });
    res.status(204).json({
      status: "Error",
      data: { restaurants },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurants = async (req, res) => {
  try {
    const { restaurants } = req;
    await restaurants.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const postReviewsRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { id } = req.sessionuser;
    const { comment, riting } = req.body;

    const restaurantReview = await Reviews.create({
      comment,
      riting,
      restaurantId,
      userId: id,
    });
    if (!restaurantReview) {
      return res.status(403).json({
        status: "Error",
        message: "The Review was not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        restaurantReview,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReviewsId = async (req, res) => {
  const { id } = req.params;
  const { comment, riting } = req.body;

  const updateReview = await Reviews.findOne({
    where: { id, status: "active" },
  });
  await updateReview.update({ comment, riting });

  res.status(201).json({
    status: "Success",
    data: {
      updateReview,
    },
  });
};

const deleteReviewsId = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReviews = await Reviews.findOne({
      where: { id, status: "active" },
    });
    if (!deleteReviews) {
      return res.status(403).json({
        status: "Error",
        message: "The reviewsId was not found",
      });
    }
    res.status(201).json({
      status: "Success",
      data: {
        deleteReviews,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRestaurants,
  getRestaurantsbyId,
  postRestaurants,
  updateRestaurants,
  deleteRestaurants,
  postReviewsRestaurantId,
  updateReviewsId,
  deleteReviewsId,
};
