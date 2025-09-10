import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrincipalLogin from './Pages/PrincipalLogin';
import PrincipalDashboard from './Pages/PrincipalDashboard';
import StaffManagement from './Pages/StaffManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PrincipalLogin />} />
          <Route path="/dashboard" element={<PrincipalDashboard />} />
          <Route path="/staff-management" element={<StaffManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;