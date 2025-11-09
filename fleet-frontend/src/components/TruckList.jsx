import React, { useContext, useState } from 'react';
import { TruckContext } from '../context/TruckContext.jsx';
import { deleteTruck, updateTruck } from '../services/api';

const TruckList = () => {
  const { trucks, loading, loadTrucks } = useContext(TruckContext);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    vehicleNumber: '',
    driverName: '',
    lastServiceDate: '',
    serviceExpenditure: '',
  });

  const handleDelete = async (id) => {
    if (window.confirm('Delete this truck?')) {
      await deleteTruck(id);
      loadTrucks();
    }
  };

  const handleEditToggle = (truck) => {
    if (editId === truck._id) {
      setEditId(null);
    } else {
      setEditId(truck._id);
      setEditForm({
        vehicleNumber: truck.vehicleNumber,
        driverName: truck.driverName,
        lastServiceDate: truck.lastServiceDate ? truck.lastServiceDate.split('T')[0] : '',
        serviceExpenditure: truck.serviceExpenditure || '',
      });
    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateTruck(editId, editForm);
    setEditId(null);
    loadTrucks();
  };

  if (loading) return <p>Loading trucks...</p>;

  return (
    <div>
      <h2>Fleet Trucks</h2>
      {trucks.length === 0 ? (
        <p>No trucks found.</p>
      ) : (
        <ul className="truck-list">
          {trucks.map((truck) => (
            <li key={truck._id} className="truck-list-item">
              {editId === truck._id ? (
                <form onSubmit={handleEditSubmit} className="truck-form">
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={editForm.vehicleNumber}
                    onChange={handleEditChange}
                    required
                    placeholder="Vehicle Number"
                  />
                  <input
                    type="text"
                    name="driverName"
                    value={editForm.driverName}
                    onChange={handleEditChange}
                    required
                    placeholder="Driver Name"
                  />
                  <input
                    type="date"
                    name="lastServiceDate"
                    value={editForm.lastServiceDate}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="number"
                    name="serviceExpenditure"
                    value={editForm.serviceExpenditure}
                    onChange={handleEditChange}
                    required
                    placeholder="Service Exp."
                  />
                  <button type="submit" className="button-save">Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="button-cancel">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span>
                    <strong>{truck.vehicleNumber}</strong> - {truck.driverName}
                  </span>
                  <div>
                    <button onClick={() => handleEditToggle(truck)} className="button-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(truck._id)} className="button-delete">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TruckList;
