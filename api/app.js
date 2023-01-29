import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRouter from "./routes/auth.js";

config();
var app = express();
const port = 5000;

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
