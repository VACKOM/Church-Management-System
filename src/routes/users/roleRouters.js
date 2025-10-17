import express from "express";
import Role from "../../models/roleModel.js";

const router = express.Router();

// ✅ Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create a new role (for seeding / admin use)
router.post("/", async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const role = new Role({ name, permissions });
    const savedRole = await role.save();

    res.status(201).json(savedRole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
