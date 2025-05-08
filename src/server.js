const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3"); // AWS SDK v3 import
const multer = require("multer");
const multerS3 = require("multer-s3");
const memberRoutes = require("./routes/api/membersRoutes");
const adminRoutes = require("./routes/api/administrators");
const bacentaRoutes = require("./routes/api/bacentaRoutes");
const centerRoutes = require("./routes/api/centersRoutes");
const directorRoutes = require("./routes/api/directors");
const targetRoutes = require("./routes/api/targetRoutes");
const zoneRoutes = require("./routes/api/zonesRoutes");
const attendanceRoutes = require("./routes/api/attendanceRoutes");
const dbConnect = require("./config/connect");
const authRoutes = require("./routes/users/authRouters");
const userRoutes = require("./routes/users/userRouters");
const File = require("./models/fileModel"); // Make sure you create a File model to store file metadata
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Amazon S3 Setup (AWS SDK v3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Set up multer to upload to S3 (using AWS SDK v3)
const upload = multer({
  storage: multerS3({
    s3: s3Client, // Use the new S3Client from v3
    bucket: process.env.AWS_BUCKET_NAME,
    //acl: "public-read", // Set access control for the file (public-read allows public access)
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});

// File Upload Route (Handle File Upload and Save URL to MongoDB)
app.post("/api/upload", upload.single("file"), async (req, res) => {
    
  try {
    // Get the contact number from the request body
    const contactNumber = req.body.contactNumber; // This assumes you're sending it as part of the form data

    // Ensure the contact number is provided
    if (!contactNumber) {
      return res.status(400).json({ error: "Contact number is required" });
    }

    // The URL where the file is stored on S3 (or wherever your storage service is)
    const fileUrl = req.file.location;

    // Create a new file document with the contact number as the originalName
    const newFile = new File({
      originalName: contactNumber,  // Use the contact number as the originalName
      fileUrl: fileUrl,             // The URL where the file is stored
    });

    // Save file metadata to MongoDB
    await newFile.save();

    // Respond with the success message and file URL
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: fileUrl,  // The URL where the file is stored
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes); // Set up member routes
app.use('/api/admins', adminRoutes); // Set up admin routes
app.use('/api/bacentas', bacentaRoutes); // Set up bacenta routes
app.use('/api/centers', centerRoutes); // Set up center routes
app.use('/api/director', directorRoutes); // Set up director routes
app.use('/api/zones', zoneRoutes); // Set up director routes
app.use('/api/targets', targetRoutes); // Set up director routes
app.use('/api/attendances', attendanceRoutes); // Set up director routes
app.use('/api/users', userRoutes);


// Serve static files from the 'uploads' directory in your backend
app.use('/uploads', express.static(path.join(__dirname, 'utilities', 'uploads')));

// Connect to MongoDB and then start the server
dbConnect();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
