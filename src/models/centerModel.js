import mongoose from "mongoose";

const centerSchema = new mongoose.Schema({
  centerID: { type: String },
  centerName: { type: String, required: true },
  centerLeader: { type: String },
  centerContact: { type: String },
  centerEmail: { type: String }
},
{
    timestamps: true,
    collection: 'centers'  // Correct placement of collection name
}

);

const Center = mongoose.model('Center', centerSchema);

export default Center;