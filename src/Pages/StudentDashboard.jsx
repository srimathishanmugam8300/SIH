import React, { useState } from 'react';
import StudentManagement from './StudentManagement';

const StudentDashboard = ({ user, onBack }) => {
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
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f4f6f8",
      padding: "20px"
    }}>
      {/* Header */}
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ 
            color: "#2c3e50",
            fontSize: "28px",
            marginBottom: "5px"
          }}>
            Student Dashboard
          </h1>
          <p style={{ 
            color: "#7f8c8d",
            fontSize: "16px",
            margin: "0"
          }}>
            Welcome, {user.name || user.username}!
          </p>
        </div>
        
        <button 
          onClick={onBack}
          style={{ 
            padding: "10px 20px", 
            background: "#95a5a6", 
            color: "white", 
            border: "none", 
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          ← Back to Principal Dashboard
        </button>
      </div>

      {/* Dashboard Content */}
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
          Student Management Portal
        </h2>
        
        <button 
          onClick={() => setCurrentView('students')}
          style={{ 
            padding: "15px 30px", 
            background: "#3498db", 
            color: "white", 
            border: "none", 
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            margin: "10px"
          }}
        >
          📊 Manage Students
        </button>
        
        <p style={{ color: "#7f8c8d", marginTop: "20px" }}>
          Click above to manage student records, enrollments, and academic progress.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;