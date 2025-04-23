import express from 'express';
import { testUserContoller } from '../controller/testController.js';

const router = express.Router();

router.get("/test", testUserContoller)

export default router;