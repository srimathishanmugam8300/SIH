import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo check (later connect to backend)
    if (username === "principal" && password === "admin123") {
      alert("Login Successful ✅");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      backgroundColor: "#f4f6f8"
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

export default Login;
