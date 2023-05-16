import express from "express";
import {
  createPlan,
  getAllPlans,
  toggleArchivatedPlan,
} from "../controllers/celPlan.js";

const router = express.Router();

router.get("/all", getAllPlans);
router.post("/new", createPlan);
router.put("/archive", toggleArchivatedPlan);

export default router;
