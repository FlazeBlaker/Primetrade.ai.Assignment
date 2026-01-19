const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    // Try connecting to the provided URI first (local or cloud)
    // If it fails or is not provided, fallback to in-memory
    let mongoUri = process.env.MONGO_URI;

    // For this assignment demo, we will prioritize the in-memory server 
    // if the local one isn't explicitly confirmed to be running/reachable,
    // but typically we'd try local first. 
    // Let's try to connect to the ENV URI.

    console.log(`Attempting to connect to: ${mongoUri}`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000 // Fail fast if local isn't running
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Local MongoDB connection failed: ${error.message}`);
    console.log('Falling back to In-Memory MongoDB...');

    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();

      await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${uri}`);

      // Log this important info for the user
      console.log("NOTE: Using temporary in-memory database. Data will reset on server restart.");
    } catch (memError) {
      console.error(`Fatal Error: Could not connect to any database. ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
