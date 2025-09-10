import React from 'react';

const StudentDashboard = ({ user, onLogout }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.name}! (Student)</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={onLogout}>Logout</button>
      <div>
        <h2>Student Features:</h2>
        <ul>
          <li>View timetable</li>
          <li>Check grades</li>
          <li>View attendance</li>
          <li>Access learning materials</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;