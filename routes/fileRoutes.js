import express from 'express';
import { upload } from '../middlewares/upload.js';
import { fileUpload } from './../controller/fileController.js';

const router = express.Router();

router.post('/upload', upload.single('avatar') ,fileUpload)

export default router;