require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/user");
const businessRouter = require("./routes/business");
const businessPointsRouter = require("./routes/businessPoints");
const customerPoints = require("./routes/customerPoints");
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  "/api/v1",
  mainRouter,
  businessRouter,
  businessPointsRouter,
  customerPoints
);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
