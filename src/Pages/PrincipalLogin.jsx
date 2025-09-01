import React, { useState } from "react";

function PrincipalLogin() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setUsername(""); // Clear previous inputs
    setPassword("");
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role first");
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      // Authentication logic would go here
      // For now, just show success message
      alert(`Login Successful as ${selectedRole.toUpperCase()}! ✅`);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        backgroundColor: "#f4f6f8",
        flexDirection: "column"
      }}>
        <div style={{ 
          background: "white", 
          padding: "40px", 
          borderRadius: "15px", 
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "350px"
        }}>
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: "30px", 
            color: "#2c3e50",
            fontSize: "28px"
          }}>
            School Portal
          </h2>
          
          <p style={{ 
            marginBottom: "30px", 
            color: "#7f8c8d",
            fontSize: "16px"
          }}>
            Please select your role to continue
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button 
              onClick={() => handleRoleSelection('principal')}
              style={{ 
                width: "100%", 
                padding: "15px", 
                background: "#e74c3c", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Principal Login
            </button>
            
            <button 
              onClick={() => handleRoleSelection('staff')}
              style={{ 
                width: "100%", 
                padding: "15px", 
                background: "#3498db", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Staff Login
            </button>
            
            <button 
              onClick={() => handleRoleSelection('student')}
              style={{ 
                width: "100%", 
                padding: "15px", 
                background: "#27ae60", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Student Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Form Screen
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      backgroundColor: "#f4f6f8",
      flexDirection: "column"
    }}>
      <form 
        onSubmit={handleLogin} 
        style={{ 
          background: "white", 
          padding: "30px", 
          borderRadius: "10px", 
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" 
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Principal Login</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        
        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "10px", 
            background: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px" 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default PrincipalLogin;