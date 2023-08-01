import express from "express";
import {
  editPlan,
  createPlan,
  filterPlan,
  getAllPlans,
  toggleArchivatedPlan,
  deletePlan,
} from "../controllers/celPlan.js";

const router = express.Router();

router.get("/all", getAllPlans);
router.post("/new", createPlan);
router.put("/edit", editPlan);
router.put("/archive", toggleArchivatedPlan);
router.post("/filter", filterPlan);
router.put("/delete", deletePlan);

export default router;
