import express from "express";

import {
  getAllPlans,
  createPlan,
  editPlan,
  toggleArchivatedPlan,
  filterPlan,
} from "../controllers/internetPlan.js";

const router = express.Router();

router.get("/all", getAllPlans);
router.post("/new", createPlan);
router.put("/edit", editPlan);
router.put("/archive", toggleArchivatedPlan);
router.post("/filter", filterPlan);

export default router;
