import { uploadImage } from '../utils/cloudinaryService.js';
// import { sendNotificationEmail } from '../services/notificationService.js';

export const handleFileUpload = async (req, res) => {
  console.log("FILE_", req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = await uploadImage(req.file.path);
    res.status(200).json({ message: 'Upload successful', imageUrl });
    // const imageUrl = await uploadImage(req.files.path);
    // await sendNotificationEmail('user@example.com', 'Upload Successful', `Your image is uploaded: ${imageUrl}`);
    // res.json({ message: 'File uploaded', url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
