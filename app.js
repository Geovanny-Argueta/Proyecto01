const express = require("express");
const { appendFile } = require("fs");

//Routers
const { userRouetes } = require("./Routes/user.routes");
const { mealRouetes } = require("./Routes/meals.routes");
const { orderRoutes } = require("./Routes/order.routes");
const { reviewsRoutes } = require("./Routes/reviews.routes");
const { restaurantsRouetes } = require("./Routes/rrestaurants.routes");

//Init our express app
const app = express();

//Enable to recieve app to data JSON
app.use(express.json());

//Define EndPoints
app.use("/api/v1/users", userRouetes);
app.use("/api/v1/meals", mealRouetes);
app.use("/api.v1/orders", orderRoutes);
app.use("/api.v1/reviews", reviewsRoutes);
app.use("/api.v1/restaurants", restaurantsRouetes);

//Catch error no existing endpoint
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Error",
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
