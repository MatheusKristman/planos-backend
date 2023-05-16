import express from "express";

import { getAllProviders } from "../controllers/provider.js";

const router = express.Router();

router.get("/all", getAllProviders);

export default router;
