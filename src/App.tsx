import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Privacidad } from './pages/Privacidad';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<Privacidad />} />
      </Routes>
    </Router>
  );
}

export default App;