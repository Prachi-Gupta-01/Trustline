import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Trustline-Complaint-Images",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});
export const upload = multer({ storage: storage });
