import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  scopeType: { 
    type: String, 
    enum: ["None", "Center", "Zone", "Bacenta"], 
    default: "None" 
  },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

export default mongoose.model("Role", roleSchema);


