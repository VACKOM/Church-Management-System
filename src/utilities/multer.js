const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Absolute path for the uploads directory
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created.');
}

const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Use the absolute path for destination
  },
  // File naming function
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalFileName = file.originalname; // Store the original file name
    const fileExtension = path.extname(file.originalname); // Get file extension

    // Save the file with a unique name while retaining the extension
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);

    // Optionally, store the original file name for later use
    req.fileOriginalName = originalFileName; // You can use this value wherever needed (like in a database or response)
  }
});


// Multer instance for handling file uploads
const upload = multer({ storage: storage });

// Export the multer instance
module.exports = upload;


