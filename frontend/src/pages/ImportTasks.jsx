// src/pages/ImportTasks.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ImportTasks() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError('')
    setMessage('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file first')
      return
    }
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tasks/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      setMessage(res.data.message || 'CSV import successful!')
      setFile(null)
    } catch (err) {
      console.error(err)
      setError('Failed to import CSV')
    }
  }

  const handleGoBack = () => {
    navigate('/tasks')
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '330%',
      backgroundColor: '#f1f8e9',
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
        <h2 style={{ color: '#33691e', marginBottom: '10px' }}>Import Tasks from CSV</h2>
        <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>
          CSV columns: title,description,priority,status,dueDate,category
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <div style={{ marginBottom: '10px' }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <button 
            onClick={handleUpload}
            style={{
              marginRight: '10px',
              backgroundColor: '#8bc34a',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Upload CSV
          </button>
          <button
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
      </div>
    </div>
  )
}

export default ImportTasks