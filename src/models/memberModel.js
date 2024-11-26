const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String },
  lname: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  digital: { type: String },
  occupation: { type: String },
  role: { type: String, required: true },
  contact: { type: String, required: true },
  baptism: { type: String, required: true },
  basonta: { type: String, required: true },
  bacenta: { type: String, required: true },
  school: { type: String, required: true },
  picture: { type: String, required: true },
  date: { type: Date, required: true }

},
{
    timestamps: true,
    collection: 'members'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Member', memberSchema);