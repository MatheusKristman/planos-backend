import express from "express";
import { getAllClients, registerClient } from "../controllers/clientPF.js";

const router = express.Router();

router.get("/all", getAllClients);
router.post("/register", registerClient);

export default router;
