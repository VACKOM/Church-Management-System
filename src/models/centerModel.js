const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  code: { type: String },
  leader: { type: String },
  contact: { type: String } 
},
{
    timestamps: true,
    collection: 'centers'  // Correct placement of collection name
}

);

module.exports = mongoose.model('Center', centerSchema);