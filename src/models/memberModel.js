import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  mname: { type: String },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  digital: { type: String },
  occupation: { type: String },
  email: { type: String },
  contact: { type: String, required: true },
  role: { type: String, required: true },
  baptism: { type: String, required: true },
  basonta: { type: String, required: true },
  gender: { type: String, required: true },
  bacenta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bacenta', required: true },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
  school: { type: String, required: true },
  date_joined: { type: Date, required: true },
  reference: { type: String, required: true },
  profileImagePath: {
    type: String,  // Save the image file path as a string
    default: null, // If no image is uploaded, set the default to null
  }
},
{
    timestamps: true,
    collection: 'members'  // Correct placement of collection name
}
);

const Member = mongoose.model('Member', memberSchema);
export default Member;