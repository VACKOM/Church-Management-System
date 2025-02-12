const nodemailer = require('nodemailer');
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../../models/userModel");

require('dotenv').config();

//# 1. Retrieve All Users
exports.getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find();
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One User    
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Function to send email
// const sendWelcomeEmail = (userEmail, username,password) => {
//     // Create a transporter using your email service credentials
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // You can replace this with another email service like SendGrid, Mailgun, etc.
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
  
//     // Email options
//     const mailOptions = {
//       from: 'vidaackom@gmail.com', // Sender email
//       to: userEmail, // Recipient email (the user's email)
//       subject: 'Welcome to Our Platform!',
//       text: `Hello ${username},\n\nThank you for registering! Your username is ${username} and temporal password is ${password}.\n\nBest regards,\nYour Team`,
//     };
  
//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending email: ', error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   };


// Create User

exports.createUser = async (req, res) => {
    try {
      const profileImagePath = req.file
        ? `https://church-management-system-39vg.onrender.com/uploads/${req.file.filename}`
        : null;
  
      // Create a new user with the data from the request body
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userContact: req.body.userContact,
        email: req.body.email, // Assuming you have an email field in the form
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        permissions: req.body.permissions,
        centerId: req.body.centerId,
        zoneId: req.body.zoneId,
        bacentaId: req.body.bacentaId,
        profileImagePath: profileImagePath,
        
      });

      //console.log(user.userContact);
      const userPassword = req.body.password;
      // Save the user to the database
      const savedUser = await user.save();

      const apiKey = process.env.MNOTIFY_API_KEY;
    
      const response = await axios.post('https://apps.mnotify.net/smsapi?', {
        key: apiKey,
        to: user.userContact,
        msg: `Your username: ${user.username}\nYour temporal password: ${userPassword}\nClick the link to login:\nhttps://stateofthekeepersapp.netlify.app/`,

        sender_id: 'KeepersApp' // Customize this sender name   
      });
      
  
      // Send the email after saving the user
     // sendWelcomeEmail(savedUser.username,savedUser.email, savedUser.password);
  
      // Send a response with the saved user data
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Update User
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};