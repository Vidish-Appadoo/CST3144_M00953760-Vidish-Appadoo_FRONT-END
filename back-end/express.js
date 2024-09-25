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
    lessonsCollection = db.collection('LESSON');
    ordersCollection = db.collection('ORDERS');
    console.log('Connected to MongoDB');
    await logLessonsContent();
    await logOrdersContent();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

// Function to log the contents of the lessons collection
async function logLessonsContent() {
    try {
      const lessons = await lessonsCollection.find({}).toArray();
      console.log('Lessons content:', lessons);
    } catch (error) {
      console.error('Failed to fetch lessons content:', error);
    }
  }

  // Function to log the contents of the lessons collection
async function logOrdersContent() {
    try {
      const orders = await ordersCollection.find({}).toArray();
      console.log('Orders content:', orders);
    } catch (error) {
      console.error('Failed to fetch lessons content:', error);
    }
  }

connectToMongo();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
