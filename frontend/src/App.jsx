// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navigation from './components/Navigation'; // Your navbar with AppBar
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Spaces from './pages/Spaces';
import ReservationForm from './pages/ReservationForm';

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/reserve" element={<ReservationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
