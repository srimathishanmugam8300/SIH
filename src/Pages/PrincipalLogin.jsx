import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import PrincipalDashboard from './PrincipalDashboard';

function PrincipalLogin() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "574537872769-fcl2dmjh6mu8h7c3l6ne5s17fsnjqfjb.apps.googleusercontent.com";

  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [authMethod, setAuthMethod] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
    setRegistrationStatus("");
    setAuthMethod("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

  if (!selectedRole) {
    setError("Please select a role first");
    return;
  }

  try {
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      alert(`Login Successful as ${selectedRole.toUpperCase()}! ✅`);
      setIsLoading(false);
    }, 1000);
  }catch (err) {
    setError("Login failed");
    setIsLoading(false);
  }
};

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

  if (!selectedRole) {
    setError("Please select a role");
    return;
  }

  try {
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      alert(`Registration Successful as ${selectedRole.toUpperCase()}! ✅\nName: ${name}\nEmail: ${email}`);
      setIsLoading(false);
      // Switch back to login after successful registration
      setIsLogin(true);
      setSelectedRole(null);
    }, 1000);
  }catch (err) {
    setError("Signup failed");
    setIsLoading(false);
  }
};

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
    setRegistrationStatus("");
    setAuthMethod("");
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
    setRegistrationStatus("");
    setAuthMethod("");
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
    setRegistrationStatus("");
    setAuthMethod("");
  };

 const Dashboard = () => (
  <PrincipalDashboard
    user={{ name, username }}
    onLogout={() => {
      setIsLoggedIn(false);
      setIsLogin(true);
      setSelectedRole(null);
      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
    }}
  />
);


  if (isLoggedIn) {
    return <Dashboard />;
  }

  if (registrationStatus.startsWith('pending_')) {
    const pendingRole = registrationStatus.replace('pending_', '');
    
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
          width: "400px"
        }}>
          <div style={{ color: "#27ae60", fontSize: "64px", marginBottom: "20px" }}>
            ✓
          </div>
          
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: "20px", 
            color: "#2c3e50",
            fontSize: "24px"
          }}>
            {authMethod === 'google' ? 'Google Registration Complete' : 'Registration Submitted for Approval'}
          </h2>
          
          <p style={{ 
            marginBottom: "25px", 
            color: "#7f8c8d",
            fontSize: "16px",
            lineHeight: "1.5"
          }}>
            {selectedRole === 'principal' 
              ? 'Your Principal account has been created successfully!'
              : `Your registration as ${pendingRole.toUpperCase()} has been submitted. Your account will be activated after approval from the Principal.`
            }
          </p>
          
          <p style={{ 
            marginBottom: "30px", 
            color: "#e67e22",
            fontSize: "14px",
            fontStyle: "italic"
          }}>
            {email && `Registered email: ${email}`}
          </p>
          
          <button 
            onClick={handleBackToLogin}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: "#3498db", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLogin && !selectedRole) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                  cursor: "pointer"
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
                  cursor: "pointer"
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
                  cursor: "pointer"
                }}
              >
                Student Login
              </button>
            </div>

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
      </GoogleOAuthProvider>
    );
  }

  if (isLogin && selectedRole) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  marginBottom: '15px'
                }}
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                shape="rectangular"
                size="large"
                width="100%"
              />
            </div>

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
      </GoogleOAuthProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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

          {selectedRole && (
            <div style={{ 
              marginBottom: "15px", 
              padding: "10px", 
              backgroundColor: selectedRole === 'principal' ? "#ffeaa7" : "#d6eaf8",
              borderRadius: "5px",
              fontSize: "14px",
              color: selectedRole === 'principal' ? "#d35400" : "#2874a6"
            }}>
              {selectedRole === 'principal' 
                ? "Principal accounts are activated immediately."
                : "Staff and Student accounts require Principal approval."
              }
            </div>
          )}

          {selectedRole && (
            <div style={{ marginBottom: '20px' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                shape="rectangular"
                size="large"
                width="100%"
              />
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#7f8c8d' }}>
            or continue with email
          </div>

          <form onSubmit={handleEmailSignup}>
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
              {isLoading ? "Submitting..." : "Register with Email"}
            </button>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default PrincipalLogin;