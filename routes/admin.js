import express from "express";
import { login, verifyAdmin, resetPass } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/is-admin", verifyToken, verifyAdmin);
router.post("/login", login);
router.post("/forgot-pass", resetPass);

export default router;
