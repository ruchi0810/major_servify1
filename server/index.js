import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import serviceProviderRoute from "./routes/serviceProviderRoute.js";
import reviewRoute from "./routes/reviewRoute.js"; // Import the new route for reviews

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use;

dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`server is running`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/users", userRoute);
app.use("/api/service-providers", serviceProviderRoute);
app.use("/api/reviews", reviewRoute);
