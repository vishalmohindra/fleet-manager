import React, { useState, useEffect } from 'react';
import { fetchTrucks, createTruck, updateTruck, deleteTruck } from './services/api';

function App() {
  const [backend, setBackend] = useState('mongo');
  const [trucks, setTrucks] = useState([]);
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverName: '',
    lastServiceDate: '',
    serviceExpenditure: '',
  });

  useEffect(() => {
    fetchTrucks(backend)
      .then(response => {
        console.log('API response:', response.data);
        setTrucks(response.data);
      })
      .catch(error => {
        console.error('Error fetching trucks', error);
      });
  }, [backend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', formData);
    try {
      await createTruck(formData, backend);
      const response = await fetchTrucks(backend);
      setTrucks(response.data);
      setFormData({ vehicleNumber: '', driverName: '', lastServiceDate: '', serviceExpenditure: '' });
    } catch (error) {
      console.error('Error creating truck', error);
      alert('Failed to add truck!');
    }
  };

  return (
    <div>
      <label>
        Select Backend:
        <select value={backend} onChange={e => setBackend(e.target.value)}>
          <option value="mongo">MongoDB</option>
          <option value="mysql">MySQL</option>
        </select>
      </label>

      <h2>Trucks List ({backend})</h2>
      <ul>
        {trucks.map(truck => (
          <li key={truck._id || truck.id}>
            {truck.vehicleNumber} - {truck.driverName} - {truck.lastServiceDate} - ₹{truck.serviceExpenditure}
          </li>
        ))}
      </ul>

      <h3>Add Truck</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Driver Name"
          value={formData.driverName}
          onChange={e => setFormData({ ...formData, driverName: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Last Service Date"
          value={formData.lastServiceDate}
          onChange={e => setFormData({ ...formData, lastServiceDate: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Service Expenditure"
          value={formData.serviceExpenditure}
          onChange={e => setFormData({ ...formData, serviceExpenditure: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;

