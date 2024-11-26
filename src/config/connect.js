const mongoose = require('mongoose');

const dbConnect = async () =>{
      try{
      const connect = await mongoose.connect(process.env.ATLAS_URI);
      console.log("Database Connected");
    }catch(err){
      console.log(err);
      process.exit(1);
    }
}

module.exports = dbConnect;
