import testUserRoutes from './testRoutes.js';
import authRoutes from "./authRoutes.js";
import express from 'express';

const router = express.Router();

router.use(testUserRoutes);
router.use(authRoutes);

export default router;