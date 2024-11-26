const mongoose = require('mongoose');

const bacentaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: String, required: true },
  center: { type: String, required: true },
  code: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  started: { type: Date, required: true },
},
{
    timestamps: true,
    collection: 'bacentas'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Bacenta', bacentaSchema);