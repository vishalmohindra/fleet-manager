import React from 'react';
import TruckList from './components/TruckList.jsx';
import TruckForm from './components/TruckForm.jsx';
import './App.css'; // or styles.css whichever you use

function App() {
  return (
    <div className="app-container">
      <h1>Fleet Manager</h1>
      <TruckForm />
      <TruckList />
    </div>
  );
}


export default App;
