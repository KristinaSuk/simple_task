// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login attempt with:", email, password);
    console.log("API URL =>", import.meta.env.VITE_API_URL);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      console.log("Login response:", res.data);
      // e.g. { message: 'Login successful', token: '...' }

      if (!res.data.token) {
        console.log("No token returned? Something is off.");
        setError("No token in response");
        return;
      }

      // Pass the token up to App.jsx so it can be stored in state
      onLoginSuccess(res.data.token);

      // Navigate after setting token
      navigate("/tasks");
      console.log("Navigating to /tasks now...");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "250%",
        backgroundColor: "#fff8e1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#ff5722",
          marginBottom: "30px",
        }}
      >
        WELCOME TO SIMPLETASK
      </h1>

      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#bf360c" }}>Log In</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "10px" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "10px" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#ff7043",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ color: "#ff5722" }}>
            Register here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Login;
