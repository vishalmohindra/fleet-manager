require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// MySQL connection added here
const db = require('./db'); // <-- Added: MySQL pool from db.js

// Connect to MongoDB as before
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON bodies

const Truck = require('./models/Truck'); // MongoDB Truck model


// GET /trucks using MySQL instead of MongoDB
app.get('/trucks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trucks'); // <-- MySQL query
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Keep other endpoints using MongoDB as before:

// Create a new truck (MongoDB)
app.post('/trucks', async (req, res) => {
  try {
    const truck = new Truck(req.body);
    await truck.save();
    res.status(201).json(truck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update truck (MongoDB)
app.put('/trucks/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete truck (MongoDB)
app.delete('/trucks/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Basic home route
app.get('/', (req, res) => {
  res.send('Welcome to FleetManager!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
