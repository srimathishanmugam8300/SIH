import React from 'react';

const StaffDashboard = ({ user, onLogout }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.name}! (Staff)</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={onLogout}>Logout</button>
      <div>
        <h2>Staff Features:</h2>
        <ul>
          <li>View assigned classes</li>
          <li>Mark attendance</li>
          <li>Enter grades</li>
          <li>View student profiles</li>
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;