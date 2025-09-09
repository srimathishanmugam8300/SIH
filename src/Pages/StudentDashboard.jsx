// In your PrincipalDashboard.js, TeacherDashboard.js, or StudentDashboard.js
import React, { useState } from 'react';
import StudentManagement from './StudentManagement';

const Dashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'students'

  if (currentView === 'students') {
    return (
      <StudentManagement 
        onBack={() => setCurrentView('main')}
        userRole={user.role}
      />
    );
  }

  return (
    <div>
      {/* Your regular dashboard content */}
      <button onClick={() => setCurrentView('students')}>
        Manage Students
      </button>
    </div>
  );
};