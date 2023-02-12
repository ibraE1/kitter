import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { register, login, logout, verifyLogin } from "../controllers/auth.js";

const router = express.Router();

// create user
router.post("/register", register);

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.get("/verifyLogin", verifyToken, verifyLogin);

export default router;
