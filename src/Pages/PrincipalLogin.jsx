  import React, { useState, useEffect } from "react";
  import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
  import { jwtDecode } from "jwt-decode";
  import { useNavigate } from "react-router-dom";
  import PrincipalDashboard from "./PrincipalDashboard";

  function PrincipalLogin() {
    const GOOGLE_CLIENT_ID =
      process.env.REACT_APP_GOOGLE_CLIENT_ID ||
      "574537872769-fcl2dmjh6mu8h7c3l6ne5s17fsnjqfjb.apps.googleusercontent.com";

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
    const [isHydrated, setIsHydrated] = useState(false);

    const navigate = useNavigate();

    // ✅ Restore session on mount
    useEffect(() => {
      try {
        const storedAuth = localStorage.getItem("schoolAuth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          const { isAuthenticated, user, timestamp } = authData;

          const isSessionValid =
            timestamp && Date.now() - timestamp < 24 * 60 * 60 * 1000;

          if (isAuthenticated && isSessionValid) {
            setIsLoggedIn(true);
            setName(user.name || "");
            setEmail(user.email || "");
            setSelectedRole(user.role || "");
          } else {
            localStorage.removeItem("schoolAuth");
          }
        }
      } catch (err) {
        console.error("Error restoring session:", err);
        localStorage.removeItem("schoolAuth");
      } finally {
        setIsHydrated(true);
      }
    }, []);

    // ✅ Save to localStorage
    const saveAuthState = (userData) => {
      const authData = {
        isAuthenticated: true,
        user: userData,
        timestamp: Date.now(),
      };
      localStorage.setItem("schoolAuth", JSON.stringify(authData));
    };

    // ✅ Clear localStorage
    const clearAuthState = () => {
      localStorage.removeItem("schoolAuth");
    };

    // ✅ Logout
    const handleLogout = () => {
      clearAuthState();
      setIsLoggedIn(false);
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
      navigate("/");
    };

    if (!isHydrated) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f6f8",
          }}
        >
          <div>Loading...</div>
        </div>
      );
    }

    // ✅ If logged in → go dashboard
    if (isLoggedIn) {
      return (
        <PrincipalDashboard
          user={{ name, email, role: selectedRole }}
          onLogout={handleLogout}
        />
      );
    }

    // Role Selection
    const handleRoleSelection = (role) => {
      setSelectedRole(role);
      setUsername("");
      setPassword("");
      setError("");
      setRegistrationStatus("");
      setAuthMethod("");
    };

    // Manual login
    const handleLogin = (e) => {
      e.preventDefault();
      setError("");

      if (!selectedRole) return setError("Please select a role first");
      if (!username.trim() || !password.trim())
        return setError("Please fill in all fields");

      setIsLoading(true);

      setTimeout(() => {
        alert(`Login Successful as ${selectedRole.toUpperCase()}! ✅`);
        setIsLoading(false);
        setIsLoggedIn(true);
        saveAuthState({
          name: username,
          email: `${username}@school.edu`,
          role: selectedRole,
          method: "manual",
        });
        navigate("/dashboard");
      }, 1000);
    };

    // Email signup
    const handleEmailSignup = (e) => {
      e.preventDefault();
      setError("");
      setAuthMethod("email");

      if (!selectedRole) return setError("Please select a role");
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim())
        return setError("Please fill in all fields");
      if (password !== confirmPassword) return setError("Passwords do not match");
      if (!email.includes("@")) return setError("Please enter a valid email");

      setIsLoading(true);

      setTimeout(() => {
        if (selectedRole === "principal") {
          alert(`Registration Successful as PRINCIPAL! ✅\nName: ${name}\nEmail: ${email}`);
          setIsLoading(false);
          setIsLogin(true);
          setIsLoggedIn(true);

          saveAuthState({
            name,
            email,
            role: "principal",
            method: "email",
          });

          navigate("/dashboard");
        } else {
          setRegistrationStatus(`pending_${selectedRole}`);
          setIsLoading(false);
        }
      }, 1000);
    };

    // Google login
    const handleGoogleSuccess = (credentialResponse) => {
      setAuthMethod("google");
      setError("");

      try {
        const decoded = jwtDecode(credentialResponse.credential);
        const { name, email } = decoded;

        setName(name);
        setEmail(email);
        setIsLoading(true);

        setTimeout(() => {
          if (selectedRole === "principal") {
            alert(`Google Login Successful as PRINCIPAL! ✅\nName: ${name}\nEmail: ${email}`);
            setIsLoading(false);
            setIsLoggedIn(true);

            saveAuthState({
              name,
              email,
              role: selectedRole,
              method: "google",
            });

            navigate("/dashboard");
          } else {
            setRegistrationStatus(`pending_${selectedRole}`);
            setIsLoading(false);
          }
        }, 1000);
      } catch (err) {
        setError("Failed to authenticate with Google. Please try again.");
        setIsLoading(false);
      }
    };

    const handleGoogleError = () => setError("Google authentication failed.");

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

    // ✅ Now keep your existing JSX (role selection, login, signup, pending state) unchanged below
    // ⬇️ Just paste your return() logic from your last version

    // --- For brevity, I didn’t rewrite all the JSX buttons/forms again because they are the same ---
    // Just keep your existing JSX from your message above.
  }

  export default PrincipalLogin;
