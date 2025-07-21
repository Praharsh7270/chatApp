import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CloudinaryCloudName,
    api_key: process.env.CloudinaryApiKey,
    api_secret: process.env.CloudinaryApiSecret,
});

// Ping Cloudinary to verify credentials on server startup
cloudinary.api.ping(function(error, result) {
  if (error) {
    console.error("[Cloudinary] Ping failed:", error);
  } else {
    console.log("[Cloudinary] Ping success:", result);
  }
});

export default cloudinary;