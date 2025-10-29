import mongoose from "mongoose";

const bacentaSchema = new mongoose.Schema({
  bacentaName: { type: String, required: true },
  bacentaLeader: { type: String, required: true },
  bacentaID: { type: String, required: true },
  bacentaLocation: { type: String, required: true },
  bacentaContact: { type: String, required: true },
  bacentaDateStarted: { type: Date, required: true },
  bacentaEmail: { type: String, required: true },

  // ✅ Store the _id of a Center instead of its name
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Center",      // Must match the model name of your Center schema
    required: true      // Optional, but recommended if every Zone must have a Center
  },

  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",      // Must match the model name of your Zone schema
    required: true      // Optional, but recommended if every Zone must have a Center
  }
},
{
    timestamps: true,
    collection: 'bacentas'  // Correct placement of collection name
}
);

const Bacenta = mongoose.model('Bacenta', bacentaSchema);

export default Bacenta;
