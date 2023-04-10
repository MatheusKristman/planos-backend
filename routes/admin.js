import express from "express";
import { login, verifyAdmin } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.get("/is-admin", verifyToken, verifyAdmin);

export default router;
