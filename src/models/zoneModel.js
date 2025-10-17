import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(
  {
    zoneID: { type: String },
    zoneName: { type: String, required: true },
    zoneLeader: { type: String },
    zoneContact: { type: String },
    zoneEmail: { type: String },

    // ✅ Store the _id of a Center instead of its name
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",      // Must match the model name of your Center schema
      required: true      // Optional, but recommended if every Zone must have a Center
    }
  },
  {
    timestamps: true,
    collection: "zones"
  }
);

const Zone = mongoose.model("Zone", zoneSchema);

export default Zone;
