import express from "express";
import { getAllPlans } from "../controllers/allPlans.js";

const router = express.Router();

router.get("/all", getAllPlans);

export default router;
