import React, { useState } from "react";

function PrincipalLogin() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!selectedRole) {
    setError("Please select a role first");
    return;
  }

  try {
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password, role: selectedRole }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      alert(`Login Successful as ${selectedRole.toUpperCase()}! ✅`);
    }
  } catch (err) {
    setError("Server error, try again");
  } finally {
    setIsLoading(false);
  }
};


  const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  if (!selectedRole) {
    setError("Please select a role");
    return;
  }

  try {
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: selectedRole }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      alert(`Registration Successful as ${selectedRole.toUpperCase()}! ✅`);
      setIsLogin(true);
      setSelectedRole(null);
    }
  } catch (err) {
    setError("Server error, try again");
  } finally {
    setIsLoading(false);
  }
};


  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleBackToLogin = () => {
    setIsLogin(true);
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setConfirmPassword("");
    setError("");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setConfirmPassword("");
    setError("");
  };

  // Role Selection Screen (Login Mode)
  if (isLogin && !selectedRole) {
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

          {/* New Registration Button */}
          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
            <button 
              onClick={toggleAuthMode}
              style={{ 
                background: "none", 
                border: "none", 
                color: "#3498db", 
                cursor: "pointer", 
                fontSize: "14px",
                textDecoration: "underline"
              }}
            >
              New Registration? Sign up here
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Form Screen
  if (isLogin && selectedRole) {
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

          {/* Toggle between Login and Registration */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button 
              onClick={toggleAuthMode}
              style={{ 
                background: "none", 
                border: "none", 
                color: "#3498db", 
                cursor: "pointer", 
                fontSize: "14px",
                textDecoration: "underline"
              }}
            >
              New Registration? Sign up here
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Registration Screen
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
        width: "400px"
      }}>
        {/* Back Button */}
        <button 
          onClick={handleBackToLogin}
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
          ← Back to Login
        </button>

        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "25px", 
          color: "#2c3e50"
        }}>
          New Registration
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
        
        <form onSubmit={handleSignup}>
          {/* Role Selection Dropdown */}
          <select
            value={selectedRole || ""}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginBottom: "15px", 
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box",
              fontSize: "16px"
            }}
          >
            <option value="">Select Your Role</option>
            <option value="principal">Principal</option>
            <option value="staff">Staff</option>
            <option value="student">Student</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              marginBottom: "15px", 
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box" 
            }}
          />
          
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            disabled={isLoading || !selectedRole}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: isLoading ? "#ccc" : "#27ae60", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: (isLoading || !selectedRole) ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrincipalLogin;