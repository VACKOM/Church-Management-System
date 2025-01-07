const mongoose = require('mongoose');

const bacentaSchema = new mongoose.Schema({
  bacenatName: { type: String, required: true },
  bacentaLeader: { type: String, required: true },
  zone: { type: String, required: true },
  bacentaID: { type: String, required: true },
  bacentaLocation: { type: String, required: true },
  bacentaContact: { type: String, required: true },
  started: { type: Date, required: true },
  bacentaEmail: { type: Date, required: true }
},
{
    timestamps: true,
    collection: 'bacentas'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Bacenta', bacentaSchema);