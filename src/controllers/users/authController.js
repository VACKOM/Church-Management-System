const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Center = require('../../models/centerModel'); // Assuming you have a Center model
const Bacenta = require('../../models/bacentaModel'); // Assuming you have a Bacenta model
const rolePermissions = require('../../config/rolePermissions');


const register = async (req, res) => {
  const { username, password, role, centerId, bacentaId } = req.body;
  const permissions = rolePermissions[role];
  
  // Validate input
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    // Check if user already exists..
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate and convert centerId and bacentaId to ObjectId if necessary
    let centerObjectId = null;
    if (centerId) {
      const center = await Center.findOne({ name: centerId });
      if (!center) {
        return res.status(400).json({ message: `Center with name "${centerId}" not found` });
      }
      centerObjectId = center._id; // Use the ObjectId of the Center
    }

    let bacentaObjectId = null;
    if (bacentaId) {
      const bacenta = await Bacenta.findOne({ name: bacentaId });
      if (!bacenta) {
        return res.status(400).json({ message: `Bacenta with name "${bacentaId}" not found` });
      }
      bacentaObjectId = bacenta._id; // Use the ObjectId of the Bacenta
    }

    // Create new user
    const user = new User({
      username,
      password,
      role,
      permissions: permissions,
      centerId: centerObjectId,  // Save ObjectId for centerId
      bacentaId: bacentaObjectId,  // Save ObjectId for bacentaId
    });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username Invalid' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'password invalid' });
    }

    // Create JWT token, including the user's role, permissions, centerId, and bacentaId
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        permissions: user.permissions, 
        centerId: user.centerId, 
        bacentaId: user.bacentaId 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { register, login };

