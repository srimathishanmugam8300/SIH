import React from 'react';

const DashboardCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
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
        {icon}
      </div>
      <h3 style={{ 
        color: "#2c3e50",
        fontSize: "20px",
        marginBottom: "10px"
      }}>
        {title}
      </h3>
      <p style={{ 
        color: "#7f8c8d",
        fontSize: "14px",
        lineHeight: "1.5"
      }}>
        {description}
      </p>
    </div>
  );
};

export default DashboardCard;