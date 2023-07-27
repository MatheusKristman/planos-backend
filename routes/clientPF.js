import express from "express";
import {
  getAllClients,
  registerClient,
  toggleContacted,
} from "../controllers/clientPF.js";

const router = express.Router();

router.get("/all", getAllClients);
router.post("/register", registerClient);
router.put("/contacted", toggleContacted);

export default router;
