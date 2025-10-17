import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/userModel.js";
import Center from "../../models/centerModel.js";
import Zone from "../../models/zoneModel.js";
import Bacenta from "../../models/bacentaModel.js";
import Role from "../../models/roleModel.js";

// ============================
// Register Controller
// ============================
export const register = async (req, res) => {
  const { username, password, roles, centerId, zoneId, bacentaId } = req.body;

  // Validate input
  if (!username || !password || !roles || roles.length === 0) {
    return res
      .status(400)
      .json({ message: "Username, password, and at least one role are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Find roles in DB
    const roleDocs = await Role.find({ name: { $in: roles } });
    if (roleDocs.length === 0) {
      return res.status(400).json({ message: "Invalid roles provided" });
    }

    // Validate and check if centerId exists
    let centerObjectId = null;
    if (centerId) {
      if (!mongoose.Types.ObjectId.isValid(centerId)) {
        return res.status(400).json({ message: "Invalid centerId format" });
      }
      centerObjectId = centerId;
      const centerExists = await Center.findById(centerObjectId);
      if (!centerExists) {
        return res.status(400).json({ message: `Center with ID "${centerId}" does not exist` });
      }
    }

    // Validate and check if zoneId exists
    let zoneObjectId = null;
    if (zoneId) {
      if (!mongoose.Types.ObjectId.isValid(zoneId)) {
        return res.status(400).json({ message: "Invalid zoneId format" });
      }
      zoneObjectId = zoneId;
      const zoneExists = await Zone.findById(zoneObjectId);
      if (!zoneExists) {
        return res.status(400).json({ message: `Zone with ID "${zoneId}" does not exist` });
      }
    }

    // Validate and check if bacentaId exists
    let bacentaObjectId = null;
    if (bacentaId) {
      if (!mongoose.Types.ObjectId.isValid(bacentaId)) {
        return res.status(400).json({ message: "Invalid bacentaId format" });
      }
      bacentaObjectId = bacentaId;
      const bacentaExists = await Bacenta.findById(bacentaObjectId);
      if (!bacentaExists) {
        return res.status(400).json({ message: `Bacenta with ID "${bacentaId}" does not exist` });
      }
    }

    // Create new user
    const user = new User({
      username,
      password,
      roles: roleDocs.map((r) => r._id),
      centerId: centerObjectId,
      zoneId: zoneObjectId,
      bacentaId: bacentaObjectId,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// ============================
// Login Controller
// ============================
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password )

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Username invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: "Password invalid" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        roleAssignments: user.roleAssignments.map((ra) => ({
          roleId: ra.roleId,
          scopeType: ra.scopeType,
          scopeItem: ra.scopeItem,
        })),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};


export default { register, login };
