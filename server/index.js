const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");
const followerRoute = require("./routes/FollowerRoute");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Some Problem Occured");
  });

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", followerRoute);

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
