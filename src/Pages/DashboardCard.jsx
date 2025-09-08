import React from 'react';

const DashboardCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "2px solid #3498db" // Same blue border for all cards
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-5px)";
        e.target.style.boxShadow = "0px 8px 20px rgba(52, 152, 219, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.1)";
      }}
      onClick={onClick}
    >
      <div style={{ 
        fontSize: "48px", 
        color: "#3498db", // Same blue color for all icons
        marginBottom: "20px" 
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