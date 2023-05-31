import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import adminRoutes from "./routes/admin.js";
import celPlanRoutes from "./routes/celPlan.js";
import internetPlanRoutes from "./routes/internetPlan.js";
import tvPlanRoutes from "./routes/tvPlan.js";
import allPlansRoutes from "./routes/allPlans.js";
import clientPFRoutes from "./routes/clientPF.js";
import providerRoutes from "./routes/provider.js";
import { createProvider, editProvider } from "./controllers/provider.js";

// Config

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// route with image
app.post("/provider/new", upload.single("providerLogo"), createProvider);
app.patch("/provider/edit", upload.single("providerLogo"), editProvider);

// route without image
app.use("/admin", multer().none(), adminRoutes);
app.use("/plan/cel-plan", multer().none(), celPlanRoutes);
app.use("/plan/internet-plan", multer().none(), internetPlanRoutes);
app.use("/plan/tv-plan", multer().none(), tvPlanRoutes);
app.use("/plan/all-plans", multer().none(), allPlansRoutes);
app.use("/client-pf", multer().none(), clientPFRoutes);
app.use("/provider", multer().none(), providerRoutes);

// Mongoose Setup

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
