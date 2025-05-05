import express from 'express';
import multer from 'multer';
import { handleFileUpload } from '../controller/uploadController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/uploadCloudinary', upload.single('image'), handleFileUpload);

export default router;
