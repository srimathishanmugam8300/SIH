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
      <div style={{ 
        background: "white", 
        padding: "30px", 
        borderRadius: "15px", 
        boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        width: "350px"
      }}>
        {/* Back Button */}
        <button 
          onClick={handleBackToRoleSelection}
          style={{ 
            background: "none", 
            border: "none", 
            color: "#3498db", 
            cursor: "pointer", 
            marginBottom: "20px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center"
          }}
        >
          ← Back to role selection
        </button>

        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px", 
          color: "#2c3e50",
          textTransform: "capitalize"
        }}>
          {selectedRole} Login
        </h2>
        
        {error && (
          <div style={{ 
            color: "red", 
            textAlign: "center", 
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "5px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginBottom: "15px", 
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box" 
            }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginBottom: "20px", 
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box" 
            }}
          />
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: isLoading ? "#ccc" : 
                         selectedRole === 'principal' ? "#e74c3c" :
                         selectedRole === 'staff' ? "#3498db" : "#27ae60", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrincipalLogin;