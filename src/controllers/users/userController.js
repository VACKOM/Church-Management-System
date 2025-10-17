import nodemailer from 'nodemailer';
import axios from 'axios';
import mongoose from 'mongoose';
import User from '../../models/userModel.js'
import Files from '../../models/fileModel.js'
import Role from "../../models/roleModel.js"; // ✅ import Role model
import dotenv from "dotenv";
import Permission from "../../models/permission.js";

dotenv.config();


//# 1. Retrieve All Users
export const getAllUsers = async (req, res) => {
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
export const getUserById = async (req, res) => {
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


// Example userController function to retrieve user by contact number
export const getUserByContact = async (req, res) => {
    
    try {
      const { contact } = req.params; // Access the contact number passed in the route
      const user = await Files.findOne({ originalName: contact }); // Assuming you're querying by contact number
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Return the user data (including the file URL if that's part of the user model)
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user data" });
    }
  };


  // Example userController function to retrieve user by contact number
  export const getUserPictures = async (req, res) => {
  
    try {
      // Fetch all files from the database
      const files = await Files.find(); // Assuming you are using 'File' model as per your schema
  
      if (files.length > 0) {
        res.json(files); // Return all files found
      } else {
        res.status(404).json({ message: "No Records Found :(" });
      }
    } catch (error) {
      console.error("Error fetching user pictures:", error);
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




//Create User

export const createUser = async (req, res) => {
  try {
    const profileImagePath = req.file
      ? `https://church-management-system-39vg.onrender.com/uploads/${req.file.filename}`
      : null;

    let {
      firstName,
      lastName,
      userContact,
      email,
      username,
      password,
      roleAssignments,
      permissions,
    } = req.body;

    // ✅ Parse JSON strings if sent as strings
    if (typeof roleAssignments === "string") {
      roleAssignments = JSON.parse(roleAssignments);
    }
    if (typeof permissions === "string") {
      permissions = JSON.parse(permissions);
    }

    // Ensure permissions is always an array
    if (!Array.isArray(permissions)) {
      permissions = [];
    }

    // ✅ Normalize roleAssignments to match schema
    roleAssignments = (roleAssignments || []).map((ra) => {
      if (ra.roleId && ra.scopeType && ra.scopeItem) {
        return {
          roleId: new mongoose.Types.ObjectId(ra.roleId), // must match schema
          scopeType: ra.scopeType,
          scopeItem: new mongoose.Types.ObjectId(ra.scopeItem),
        };
      }
      return ra;
    });

    // ✅ Collect role-based permissions
    let rolePermissions = [];
    for (let ra of roleAssignments) {
      const role = await Role.findById(ra.roleId).populate("permissions");
      if (role && role.permissions) {
        role.permissions.forEach((perm) => {
          if (perm.name && !rolePermissions.includes(perm.name)) {
            rolePermissions.push(perm.name);
          }
        });
      }
    }

    // ✅ Merge role + manual permissions
    const finalPermissions = [...new Set([...rolePermissions, ...permissions])];

    // ✅ Create user
    const user = new User({
      firstName,
      lastName,
      userContact,
      email,
      username,
      password,
      roleAssignments,
      permissions: finalPermissions,
      profileImagePath,
    });

    console.log("REQ BODY (normalized):", JSON.stringify(user, null, 2));

    const savedUser = await user.save();

    // ✅ Send SMS
    const apiKey = process.env.MNOTIFY_API_KEY;
    if (userContact) {
      await axios.post("https://apps.mnotify.net/smsapi?", {
        key: apiKey,
        to: userContact,
        msg: `Your username: ${username}\nYour temporal password: ${password}\nClick to login:\nhttps://stateofthekeepersapp.netlify.app/`,
        sender_id: "KeepersApp",
      });
    }

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Update User

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    let {
      firstName,
      lastName,
      userContact,
      email,
      username,
      password,
      roleAssignments,
      permissions,
    } = req.body;

    // ✅ Parse if coming as JSON strings
    if (typeof roleAssignments === "string") {
      roleAssignments = JSON.parse(roleAssignments);
    }
    if (typeof permissions === "string") {
      permissions = JSON.parse(permissions);
    }

    // Ensure permissions is always an array
    if (!Array.isArray(permissions)) {
      permissions = [];
    }

    // ✅ Collect permissions from roles
    let rolePermissions = [];
    for (let ra of roleAssignments || []) {
      const role = await Role.findById(ra.role).populate("permissions");
      if (role && role.permissions) {
        role.permissions.forEach((perm) => {
          if (perm.name && !rolePermissions.includes(perm.name)) {
            rolePermissions.push(perm.name);
          }
        });
      }
    }

    // ✅ Merge role-based + manual permissions
    const finalPermissions = [...new Set([...rolePermissions, ...permissions])];

    // ✅ Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        userContact,
        email,
        username,
        ...(password && { password }), // only update if provided
        roleAssignments,
        permissions: finalPermissions,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete User
export const deleteUser = async (req, res) => {
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

export default {
  getAllUsers,
  getUserById,
  getUserPictures,
  getUserByContact,
  createUser,
  updateUser,
  deleteUser
};