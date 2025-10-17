import mongoose from "mongoose";
import Permission from "./models/permission.js";
import Role from "./models/roleModel.js";

// 1. Connect to DB
const MONGO_URI = "mongodb+srv://kmwcitech:xOzd3AyhVC1PqUdE@cluster0.bmxq6.mongodb.net/state_of_the_keeper?retryWrites=true&w=majority&appName=Cluster0"; // change db name

const permissions = [
  "user:create", "user:read", "user:update", "user:delete",
  "center:create", "center:read", "center:update", "center:delete",
  "zone:create", "zone:read", "zone:update", "zone:delete",
  "bacenta:create", "bacenta:read", "bacenta:update", "bacenta:delete",
  "member:create", "member:read", "member:update", "member:delete",
  "role:manage", "permission:manage",
  "report:read", "dashboard:read"
];

const roles = {
  Administrator: [
    ...permissions
  ],
  Bishop: [
    "user:read", "center:read", "zone:read", "bacenta:read", "member:read",
    "report:read", "dashboard:read"
  ],
  LeadPastor: [
    "center:create", "center:read", "center:update", "center:delete",
    "zone:create", "zone:read", "zone:update", "zone:delete",
    "bacenta:create", "bacenta:read", "bacenta:update", "bacenta:delete",
    "member:create", "member:read", "member:update", "member:delete",
    "report:read", "dashboard:read"
  ],
  CenterLeader: [
    "zone:create", "zone:read", "zone:update", "zone:delete",
    "bacenta:create", "bacenta:read", "bacenta:update", "bacenta:delete",
    "member:create", "member:read", "member:update", "member:delete",
    "report:read", "dashboard:read"
  ],
  ZoneLeader: [
    "bacenta:create", "bacenta:read", "bacenta:update", "bacenta:delete",
    "member:create", "member:read", "member:update", "member:delete",
    "report:read", "dashboard:read"
  ],
  BacentaLeader: [
    "member:create", "member:read", "member:update", "member:delete",
    "report:read", "dashboard:read"
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data (optional)
    await Permission.deleteMany();
    await Role.deleteMany();

    // Insert permissions
    const permissionDocs = await Permission.insertMany(
      permissions.map(p => ({ name: p }))
    );

    // Map for easy lookup
    const permMap = {};
    permissionDocs.forEach(p => { permMap[p.name] = p._id; });

    // Insert roles
    for (const [roleName, perms] of Object.entries(roles)) {
      const role = new Role({
        name: roleName,
        permissions: perms.map(p => permMap[p])
      });
      await role.save();
    }

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
