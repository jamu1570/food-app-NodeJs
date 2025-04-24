import express from 'express';
import { getUserController } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/getuser", authMiddleware, getUserController);

export default router;