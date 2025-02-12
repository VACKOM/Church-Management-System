const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcryptjs is imported

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    
    },
    lastName: {
      type: String,
      required: true,
     
    },
    userContact: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Ensure passwords are at least 8 characters long for better security
    },
    email: {
      type: String,
      required: true,
      //unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "bishop", 
        "lead_pastor", 
        "administrator", 
        "zone", 
        "center", 
        "bacenta"
      ],
    },
    permissions: {
      type: [String], // List of specific permissions for this user
      default: [],
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Center',  // Reference to the 'Center' model (assuming you have a 'Center' model)
      default: null,
    },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',  // Reference to the 'Center' model (assuming you have a 'Zone' model)
      default: null,
    },
    bacentaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bacenta', // Reference to the 'Bacenta' model (assuming you have a 'Bacenta' model)
      default: null,
    },
    profileImagePath: {
      type: String,  // Save the image file path as a string
      default: null, // If no image is uploaded, set the default to null
    }
  },
  {
    timestamps: true,
    collection: 'users',  // Correct placement of collection name
  }
);

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    // Hash the password before saving it to the database
    this.password = await bcrypt.hash(this.password, 10); // 10 salt rounds
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or handler
  }
});

// Method to compare password 
userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = mongoose.model('User', userSchema);

