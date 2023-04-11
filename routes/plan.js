import express from "express";
import { getAll, createPlan } from "../controllers/plan.js";

const router = express.Router();

router.get("/all", getAll);

export default router;
