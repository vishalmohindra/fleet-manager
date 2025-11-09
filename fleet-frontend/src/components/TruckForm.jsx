import React, { useContext, useState } from 'react';
import { TruckContext } from '../context/TruckContext.jsx';
import { createTruck } from '../services/api';

const TruckForm = () => {
  const { loadTrucks } = useContext(TruckContext);
  const [form, setForm] = useState({
    vehicleNumber: '',
    driverName: '',
    lastServiceDate: '',
    serviceExpenditure: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTruck(form);
    setForm({
      vehicleNumber: '',
      driverName: '',
      lastServiceDate: '',
      serviceExpenditure: ''
    });
    loadTrucks();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2em', background: '#f4f8fb', padding: '1em', borderRadius: '8px' }}>
      <h3 style={{ color: '#2266bb' }}>Add a New Truck</h3>
      <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={form.vehicleNumber} onChange={handleChange} required />
      <input type="text" name="driverName" placeholder="Driver Name" value={form.driverName} onChange={handleChange} required />
      <input type="date" name="lastServiceDate" placeholder="Last Service Date" value={form.lastServiceDate} onChange={handleChange} required />
      <input type="number" name="serviceExpenditure" placeholder="Service Expenditure" value={form.serviceExpenditure} onChange={handleChange} required/>
      <button type="submit" style={{ background: '#49c3e7', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', marginLeft: '8px' }}>Add Truck</button>
    </form>
  );
};

export default TruckForm;
