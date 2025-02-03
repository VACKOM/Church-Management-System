const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require('path');
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
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth' , authRoutes);
app.use('/api/members', memberRoutes); // Set up member routes
app.use('/api/admins', adminRoutes); // Set up admin routes
app.use('/api/bacentas', bacentaRoutes); // Set up bacenta routes
app.use('/api/centers', centerRoutes); // Set up center routes
app.use('/api/director', directorRoutes); // Set up director routes
app.use('/api/zones', zoneRoutes); // Set up director routes
app.use('/api/targets', targetRoutes); // Set up director routes
app.use('/api/attendances', attendanceRoutes); // Set up director routes
app.use('/api/users', userRoutes);
// Serve static files from the 'uploads' directory
// Serve static files from the 'uploads' directory in your backend
app.use('/uploads', express.static(path.join(__dirname, 'utilities', 'uploads')));

//Connect to the database and then start the server
dbConnect();
const PORT= process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})


