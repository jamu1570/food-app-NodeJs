import express from 'express';
import { getLocation } from '../controller/getLocationController.js';

const router = express.Router();

router.get("/detect-location", getLocation);

export default router;
