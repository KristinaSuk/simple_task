import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username, email, password
      })
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '530%',
      backgroundColor: '#e3f2fd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '150%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#0d47a1' }}>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginRight: '10px' }}>Username:</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginRight: '10px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginRight: '10px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            style={{
              backgroundColor: '#2196f3',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Already have an account? <a href="/login">Login</a>.
        </p>
      </div>
    </div>
  )
}

export default Register