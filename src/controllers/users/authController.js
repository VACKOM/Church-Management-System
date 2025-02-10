const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Center = require('../../models/centerModel'); // Assuming you have a Center model
const Zone = require("../../models/zoneModel");
const Bacenta = require('../../models/bacentaModel'); // Assuming you have a Bacenta model
const rolePermissions = require('../../config/rolePermissions');

const register = async (req, res) => {
  const { username, password, role, centerId, zoneId, bacentaId } = req.body;
  const permissions = rolePermissions[role];
  
  // Validate input
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // Validate and check if centerId exists
    let centerObjectId = null;
    if (centerId) {
      if (!mongoose.Types.ObjectId.isValid(centerId)) {
        return res.status(400).json({ message: 'Invalid centerId format' });
      }
      centerObjectId = centerId; // Use the provided ObjectId
      const centerExists = await Center.findById(centerObjectId);
      if (!centerExists) {
        return res.status(400).json({ message: `Center with ID "${centerId}" does not exist` });
      }
    }

    // Validate and check if zoneId exists
    let zoneObjectId = null;
    if (zoneId) {
      if (!mongoose.Types.ObjectId.isValid(zoneId)) {
        return res.status(400).json({ message: 'Invalid zoneId format' });
      }
      zoneObjectId = zoneId; // Use the provided ObjectId
      const zoneExists = await Zone.findById(zoneObjectId);
      if (!zoneExists) {
        return res.status(400).json({ message: `Zone with ID "${zoneId}" does not exist` });
      }
    }

    // Validate and check if bacentaId exists
    let bacentaObjectId = null;
    if (bacentaId) {
      if (!mongoose.Types.ObjectId.isValid(bacentaId)) {
        return res.status(400).json({ message: 'Invalid bacentaId format' });
      }
      bacentaObjectId = bacentaId; // Use the provided ObjectId
      const bacentaExists = await Bacenta.findById(bacentaObjectId);
      if (!bacentaExists) {
        return res.status(400).json({ message: `Bacenta with ID "${bacentaId}" does not exist` });
      }
    }

    // Create new user
    const user = new User({
      username,
      password,
      role,
      permissions: permissions,
      centerId: centerObjectId,  // Store the ObjectId for centerId 
      zoneId: zoneObjectId,  // Store the ObjectId for zoneId
      bacentaId: bacentaObjectId,  // Store the ObjectId for bacentaId
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

  console.log(username);
  console.log(password);

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
   
    if (!user) {
      return res.status(400).json({ message: 'Username Invalid' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password invalid' });
    }

    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        permissions: user.permissions, 
        centerId: user.centerId, 
        zoneId: user.zoneId, 
        bacentaId: user.bacentaId
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
 
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};



module.exports = { register, login };
