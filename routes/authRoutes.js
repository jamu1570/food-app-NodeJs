import express from 'express';
import { loginController, registerController } from '../controller/authController.js';
import { userValidationRules, validate } from '../middlewares/validation.js';

const router = express.Router();

router.post('/register', userValidationRules, validate, registerController);
router.post('/login', loginController);

export default router;
