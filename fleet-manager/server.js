// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = require('./db');
const Truck = require('./models/Truck');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB routes
app.get('/trucks-mongo', async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/trucks-mongo', async (req, res) => {
  try {
    const truck = new Truck(req.body);
    await truck.save();
    res.status(201).json(truck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/trucks-mongo/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/trucks-mongo/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MySQL routes
app.get('/trucks-mysql', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trucks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/trucks-mysql', async (req, res) => {
  try {
    const { vehicleNumber, driverName, lastServiceDate, serviceExpenditure } = req.body;
    const [result] = await db.query(
      'INSERT INTO trucks (vehicleNumber, driverName, lastServiceDate, serviceExpenditure) VALUES (?, ?, ?, ?)',
      [vehicleNumber, driverName, lastServiceDate, serviceExpenditure]
    );
    res.status(201).json({ id: result.insertId, vehicleNumber, driverName, lastServiceDate, serviceExpenditure });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/trucks-mysql/:id', async (req, res) => {
  try {
    const { vehicleNumber, driverName, lastServiceDate, serviceExpenditure } = req.body;
    const [result] = await db.query(
      'UPDATE trucks SET vehicleNumber = ?, driverName = ?, lastServiceDate = ?, serviceExpenditure = ? WHERE id = ?',
      [vehicleNumber, driverName, lastServiceDate, serviceExpenditure, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Truck not found' });
    res.json({ id: req.params.id, vehicleNumber, driverName, lastServiceDate, serviceExpenditure });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/trucks-mysql/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM trucks WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to FleetManager!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
