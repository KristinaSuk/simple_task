// src/pages/TaskMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function TaskMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "570%",
        backgroundColor: "#f3e5f5",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "30px", color: "#6a1b9a", fontSize: "2rem" }}>
        Task Menu
      </h2>
      <button
        onClick={() => navigate("/tasks/all")}
        style={{
          padding: "10px 20px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#8e24aa",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        View / Edit / Search Tasks
      </button>
      <button
        onClick={() => navigate("/tasks/create")}
        style={{
          padding: "10px 20px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#ab47bc",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Create a New Task
      </button>
      <button
        onClick={() => navigate("/tasks/import")}
        style={{
          padding: "10px 20px",
          marginBottom: "30px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#ec407a",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Import Tasks from CSV
      </button>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#d81b60",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TaskMenu;
