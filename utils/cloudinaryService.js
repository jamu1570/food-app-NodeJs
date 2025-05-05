import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (filePath) => {
  console.log("FII-", filePath)
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads'
    });
    return result.secure_url;
  } catch (err) {
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
};
