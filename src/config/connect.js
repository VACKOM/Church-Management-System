import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      serverSelectionTimeoutMS: 5000,
      ssl: true,
    });

    console.log("Database Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default dbConnect;
