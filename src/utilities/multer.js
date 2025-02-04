const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Absolute path for the uploads directory
const uploadDir = path.join(__dirname, 'uploads');
console.log(uploadDir)
// Ensure the 'uploads' directory exists asynchronously
fs.promises.mkdir(uploadDir, { recursive: true })
  .then(() => console.log('Uploads directory created.'))
  .catch((err) => console.error('Error creating uploads directory:', err));

// Multer storage configuration
const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Use the absolute path for destination
  },
  // File naming function
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    console.log("filename created")
  }
});

// Multer instance for handling file uploads
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });  // Limit file size to 10MB

// Export the multer instance
module.exports = upload;
