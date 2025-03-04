import { useState } from 'react'
import axios from 'axios'

function CSVUpload({ onUpload }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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
      onUpload() // refresh tasks
    } catch (err) {
      console.error(err)
      setError('Failed to import CSV')
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <input 
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Upload CSV
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}

export default CSVUpload