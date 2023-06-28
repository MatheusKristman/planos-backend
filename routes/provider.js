import express from "express";

import { getAllProviders, deleteProvider } from "../controllers/provider.js";

const router = express.Router();

router.get("/all", getAllProviders);
router.delete("/delete/:id", deleteProvider);

export default router;
