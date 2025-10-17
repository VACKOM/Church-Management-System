import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define Role Assignment Schema
const roleAssignmentSchema = new mongoose.Schema({
  roleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Role", 
    required: true 
  },
  scopeType: {
    type: String,
    enum: ["None", "CenterLeader", "ZoneLeader", "BacentaLeader"],
    default: "None",
  },
  scopeItem: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "scopeType", // ✅ correct (relative to the same subdoc)
  },
});




const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userContact: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
        message: () =>
          `Password must contain at least 1 uppercase, 1 lowercase letter, and 1 number`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // NEW: multiple roles with optional scoped assignments
    roleAssignments: [roleAssignmentSchema],

    profileImagePath: {
      type: String,
      default: null,
      match: /^https?:\/\//, // optional: ensures stored path is a valid URL if provided
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Index for fast queries
userSchema.index({ username: 1, email: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
