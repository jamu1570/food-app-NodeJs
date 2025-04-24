import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import express from 'express';

const router = express.Router();

router.use("/api/v1/auth",authRoutes);
router.use("/api/v1/user",userRoutes);

export default router;