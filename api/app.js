import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

config();
const app = express();
const port = 5000;

app.enable("trust proxy");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://kitter.vercel.app"],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "kitter",
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
