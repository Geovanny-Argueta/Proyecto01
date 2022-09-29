const dotenv = require("dotenv");
const { app } = require("./app");
const { db } = require("./Utils/db.utils");
const { initModels } = require("./Moduls/init modul");
dotenv.config({ path: "./config.env" });

const starServer = async () => {
  try {
    await db.authenticate();

    //Init models
    initModels();

    await db.sync();

    //Set server to listen
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log("The server is running well!");
    });
  } catch (error) {
    console.log(error);
  }
};

starServer();
