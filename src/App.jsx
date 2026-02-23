import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiftConfigurator from './pages/LiftConfigurator';
import StickyElevatorPad from './components/StickyElevatorPad';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* The sticky elevator pad is global or home-only? We will make it global for the demo, or just render it on Home. Let's render it within Home so it doesn't overlap the Configurator. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-your-lift" element={<LiftConfigurator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
