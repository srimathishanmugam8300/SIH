import React, { useState } from "react";

function PrincipalLogin() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Initialize users in localStorage if not exists
  const initializeUsers = () => {
    if (!localStorage.getItem('schoolUsers')) {
      localStorage.setItem('schoolUsers', JSON.stringify([]));
    }
  };

  // Get all users from localStorage
  const getUsers = () => {
    initializeUsers();
    return JSON.parse(localStorage.getItem('schoolUsers'));
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('schoolUsers', JSON.stringify(users));
  };

  // Add new user
  const registerUser = (userData) => {
    const users = getUsers();
    
    // Check if username already exists
    if (users.find(user => user.username === userData.username)) {
      return { success: false, message: 'Username already exists' };
    }

    // Check if email already exists
    if (users.find(user => user.email === userData.email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Create new user with auto-increment ID
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      ...userData
    };

    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: newUser };
  };

  // Authenticate user
  const authenticateUser = (username, password) => {
    const users = getUsers();
    const user = users.find(user => 
      user.username === username && user.password === password
    );
    
    if (user) {
      // Don't return password in the user object
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
    setError("");
    setIsSignUp(false);
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

    // Simulate API call delay
    setTimeout(() => {
      const result = authenticateUser(username, password);
      
      if (result.success) {
        // Check if user role matches selected role
        if (result.user.role !== selectedRole) {
          setError(`This account is registered as a ${result.user.role}, not ${selectedRole}`);
        } else {
          alert(`Login Successful as ${selectedRole.toUpperCase()}! ✅\nWelcome ${result.user.name}`);
          // Here you would typically redirect to dashboard or set user state
        }
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role first");
      return;
    }

    if (!username.trim() || !password.trim() || !email.trim() || !fullName.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const userData = {
        username,
        password,
        email,
        name: fullName,
        role: selectedRole
      };

      const result = registerUser(userData);
      
      if (result.success) {
        alert(`Account created successfully! ✅\nYou can now login as ${selectedRole}`);
        setIsSignUp(false);
        setEmail("");
        setFullName("");
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
    setError("");
    setIsSignUp(false);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
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
              onMouseOver={(e) => e.target.style.opacity = "0.8"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
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
              onMouseOver={(e) => e.target.style.opacity = "0.8"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
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
              onMouseOver={(e) => e.target.style.opacity = "0.8"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
            >
              Student Login
            </button>
          </div>

          <div style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#6c757d"
          }}>
            <strong>No accounts exist yet.</strong><br/>
            Select a role and click "Sign Up" to create your first account.
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Form Screen
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
          onMouseOver={(e) => e.target.style.textDecoration = "underline"}
          onMouseOut={(e) => e.target.style.textDecoration = "none"}
        >
          ← Back to role selection
        </button>

        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px", 
          color: "#2c3e50",
          textTransform: "capitalize"
        }}>
          {selectedRole} {isSignUp ? 'Sign Up' : 'Login'}
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
        
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp && (
            <>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>
            </>
          )}
          
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              style={{ 
                width: "100%", 
                padding: "12px", 
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box" 
              }}
            />
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{ 
                width: "100%", 
                padding: "12px", 
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box" 
              }}
            />
          </div>
          
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
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              if (!isLoading) e.target.style.opacity = "0.8";
            }}
            onMouseOut={(e) => {
              if (!isLoading) e.target.style.opacity = "1";
            }}
          >
            {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#6c757d"
        }}>
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button 
              type="button" 
              onClick={toggleSignUp}
              style={{
                background: "none",
                border: "none",
                color: "#3498db",
                cursor: "pointer",
                marginLeft: "5px",
                textDecoration: "underline"
              }}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrincipalLogin;