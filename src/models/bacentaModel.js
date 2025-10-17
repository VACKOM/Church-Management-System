import mongoose from "mongoose";

const bacentaSchema = new mongoose.Schema({
  bacentaName: { type: String, required: true },
  bacentaLeader: { type: String, required: true },
  zone: { type: String, required: true },
  center: { type: String, required: true },
  bacentaID: { type: String, required: true },
  bacentaLocation: { type: String, required: true },
  bacentaContact: { type: String, required: true },
  bacentaDateStarted: { type: Date, required: true },
  bacentaEmail: { type: String, required: true }
},
{
    timestamps: true,
    collection: 'bacentas'  // Correct placement of collection name
}
);

const Bacenta = mongoose.model('Bacenta', bacentaSchema);

export default Bacenta;
