import express from "express";
import { getAllLeads, registerLead } from "../controllers/lead.js";

const router = express.Router();

router.get("/all", getAllLeads);
router.post("/register", registerLead);

export default router;
