import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
var app = express();
const port = 5000;

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
  });
});
