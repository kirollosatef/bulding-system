require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    "Access-Control-Allow-Origin": "*",
  })
);
app.use(express.json());
const conect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/Building").then(
    () => {
      console.log("connected to mongodb");
    },
    (err) => {
      console.log("err", err);
    }
  );
};
conect();
const userRoutes = require("./routes/userRoute");
const buildingRoutes = require("./routes/buildingRoutes");
const clientRoutes = require("./routes/clientRoutes");
const rentRoutes = require("./routes/rentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { createAdminIfNotExist } = require("./controllers/userController");
app.use("/auth", userRoutes);
app.use("/building", buildingRoutes);
app.use("/client", clientRoutes);
app.use("/rent", rentRoutes);
app.use("/payment", paymentRoutes);

createAdminIfNotExist();

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});
