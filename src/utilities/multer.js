import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path for the uploads directory
const uploadDir = path.join(__dirname, "uploads");
console.log("Uploads directory path:", uploadDir);

// Ensure the 'uploads' directory exists asynchronously
fs.promises
  .mkdir(uploadDir, { recursive: true })
  .then(() => console.log("Uploads directory created."))
  .catch((err) => console.error("Error creating uploads directory:", err));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the absolute path for destination
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    console.log("Filename created:", file.originalname);
  },
});

// Multer instance for handling file uploads (limit: 10MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Export the multer instance
export default upload;
