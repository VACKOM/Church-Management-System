import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  bacenta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bacenta', required: true },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
  membershipCount: {type: Number, required: true}

  
},
{
    timestamps: true,
    collection: 'membershipSummary'  // Correct placement of collection name
}
);

const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;