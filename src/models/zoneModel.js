const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  zoneID: { type: String },
  zoneName: { type: String, required: true },
  zoneLeader: { type: String },
  zoneContact: { type: String },
  zoneEmail: { type: String },
  center: {type:String}
},
{
    timestamps: true,
    collection: 'zones'  // Correct placement of collection name
}

);

module.exports = mongoose.model('Zone', zoneSchema);