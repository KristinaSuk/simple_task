// src/pages/CreateTask.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('New')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!title) {
      setError('Title is required')
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title, description, priority, status,
        dueDate: dueDate || null,
        category: category || null
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess('Task created successfully!')
      // clear
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setStatus('New')
      setDueDate('')
      setCategory('')
    } catch (err) {
      console.error(err)
      setError('Failed to create task')
    }
  }

  const handleGoBack = () => {
    navigate('/tasks')
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '500%',
      backgroundColor: '#fffde7',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '90%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#f57f17', marginBottom: '20px' }}>Create a New Task</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Description:</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Priority:</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Status:</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Category:</label>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="e.g. Work"
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                marginRight: '10px',
                backgroundColor: '#fbc02d',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={handleGoBack}
              style={{
                backgroundColor: '#bdbdbd',
                color: '#000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask