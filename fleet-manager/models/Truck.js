// backend/models/Truck.js
const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  lastServiceDate: { type: String, required: true },
  serviceExpenditure: { type: Number, required: true }
});

const Truck = mongoose.model('Truck', truckSchema, 'trucks');

module.exports = Truck;
