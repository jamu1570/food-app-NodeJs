import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import getLocationRoutes from "./getLocation.js";
import fileRoutes from "./fileRoutes.js";
import cloudinaryRoutes from "./uploadRoutes.js";
import express from 'express';

const router = express.Router();

router.use("/api/v1/auth",authRoutes);
router.use("/api/v1/user",userRoutes);
router.use("/api/v1",getLocationRoutes);
router.use("/api/v1",fileRoutes);
router.use("/api/v1",cloudinaryRoutes);

export default router;