import express from "express";
import { register, login, checkuser } from "../controller/userController.js";

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

//
// Check users
router.get("/check", checkuser);

export default router;
