import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Import your pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskMenu from './pages/TaskMenu'
import AllTasks from './pages/AllTasks'
import CreateTask from './pages/CreateTask'
import ImportTasks from './pages/ImportTasks'

function App() {
  // 1) Keep the token in React state
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')

  // 2) Sync localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // Provide a callback for login success
  const handleLoginSuccess = (newToken) => {
    setToken(newToken)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes: only accessible if token is present */}
        <Route
          path="/tasks"
          element={token ? <TaskMenu /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tasks/all"
          element={token ? <AllTasks /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tasks/create"
          element={token ? <CreateTask /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tasks/import"
          element={token ? <ImportTasks /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
