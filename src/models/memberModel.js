const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  address: { type: String, required: true },
  digital: { type: String },
  occupation: { type: String },
  contact: { type: String, required: true },
  baptism_status: { type: String, required: true },
  basonta: { type: String, required: true },
  bacenta: { type: String, required: true },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
  lay_school: { type: String, required: true },
  picture: { type: String, required: true },
  date_joined: { type: Date, required: true }
},
{
    timestamps: true,
    collection: 'members'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Member', memberSchema);