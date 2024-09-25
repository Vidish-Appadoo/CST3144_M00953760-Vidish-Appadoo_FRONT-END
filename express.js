const express = require('express');
const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.opsc7.mongodb.net/"

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to Mongo
const client = new MongoClient(MONGO_URI);

let db, lessonsCollection;

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('CST3144_M00953760');  
    lessonsCollection = db.collection('lessons');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

connectToMongo();

// Start the server
const PORT = 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
