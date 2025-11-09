import React, { createContext, useState, useEffect } from 'react';
import { fetchTrucks } from '../services/api';

export const TruckContext = createContext();

export const TruckProvider = ({ children }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrucks = async () => {
    setLoading(true);
    try {
      const response = await fetchTrucks();
      setTrucks(response.data);
    } catch (error) {
      console.error('Error fetching trucks', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTrucks();
  }, []);

  return (
    <TruckContext.Provider value={{ trucks, setTrucks, loading, loadTrucks }}>
      {children}
    </TruckContext.Provider>
  );
};
