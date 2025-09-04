import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import StaffManagement from './StaffManagement';
import StudentManagement from './StudentManagement';

const PrincipalDashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const dashboardItems = [
    {
      icon: "👥",
      title: "Access Staffs",
      description: "Manage teaching and non-teaching staff accounts, permissions, and profiles",
      onClick: () => setCurrentPage('staff')
    },
    {
      icon: "🎓",
      title: "Access Students",
      description: "View student profiles, manage enrollments, and track academic progress",
      onClick: () => setCurrentPage('students') // This line connects to Student Management
    },
    {
      icon: "📅",
      title: "Generate Timetable",
      description: "Create and manage class schedules, teacher assignments, and room allocations",
      onClick: () => alert("Generate Timetable functionality will be implemented here")
    },
    {
      icon: "📚",
      title: "Generate Curriculum",
      description: "Design course structures, syllabus, and academic curriculum for different programs",
      onClick: () => alert("Generate Curriculum functionality will be implemented here")
    },
    {
      icon: "⚡",
      title: "Access Activities",
      description: "Manage extracurricular activities, events, clubs, and student organizations",
      onClick: () => alert("Access Activities functionality will be implemented here")
    }
  ];

  if (currentPage === 'staff') {
    return <StaffManagement onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'students') {
    return <StudentManagement onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f4f6f8",
      padding: "20px"
    }}>
      {/* Header - Aligned to left */}
      <div style={{ 
        background: "white", 
        padding: "25px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "30px",
        textAlign: "left"
      }}>
        <h1 style={{ 
          color: "#2c3e50",
          fontSize: "32px",
          marginBottom: "8px",
          fontWeight: "600"
        }}>
          Welcome, {user.name || user.username}!
        </h1>
        
        <p style={{ 
          fontSize: "18px",
          color: "#7f8c8d",
          marginBottom: "0",
          fontWeight: "500"
        }}>
          Principal Dashboard
        </p>
      </div>

      {/* Top Row - 3 Grids */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "25px",
        maxWidth: "1000px",
        margin: "0 auto 25px auto"
      }}>
        {dashboardItems.slice(0, 3).map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={item.onClick}
          />
        ))}
      </div>

      {/* Bottom Row - 2 Grids Centered */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "25px",
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        {dashboardItems.slice(3, 5).map((item, index) => (
          <DashboardCard
            key={index + 3}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={item.onClick}
          />
        ))}
      </div>

      {/* Logout Button */}
      <div style={{ 
        textAlign: "center", 
        marginTop: "50px" 
      }}>
        <button 
          onClick={onLogout}
          style={{ 
            padding: "12px 40px", 
            background: "#e74c3c", 
            color: "white", 
            border: "none", 
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.background = "#c0392b"}
          onMouseLeave={(e) => e.target.style.background = "#e74c3c"}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PrincipalDashboard;