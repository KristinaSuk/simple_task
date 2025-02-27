// src/pages/AllTasks.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TaskSearchFilter from '../components/TaskSearchFilter'

function AllTasks() {
  const [tasks, setTasks] = useState([])
  const [editId, setEditId] = useState(null)
  const [editFields, setEditFields] = useState({})
  const [filterParams, setFilterParams] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks({})
  }, [])

  const fetchTasks = async (filters) => {
    try {
      const token = localStorage.getItem('token')
      const params = {}
      if (filters.search) params.search = filters.search
      if (filters.priority) params.priority = filters.priority
      if (filters.status) params.status = filters.status
      if (filters.category) params.category = filters.category

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      })
      setTasks(res.data)
      
    } catch (err) {
      console.error(err)
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    
  }

  const handleFilterChange = (filters) => {
    setFilterParams(filters)
    fetchTasks(filters)
  }

  // inline editing
  const handleEdit = (task) => {
    setEditId(task.id)
    setEditFields({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'Medium',
      status: task.status || 'New',
      dueDate: task.dueDate || '',
      category: task.category || ''
    })
  }
  const handleEditFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }))
  }
  const handleSaveEdit = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, editFields, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditId(null)
      fetchTasks(filterParams)
    } catch (err) {
      console.error(err)
    }
  }
  const handleCancelEdit = () => {
    setEditId(null)
    setEditFields({})
  }

  const handleToggleCompleted = async (task) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, 
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks(filterParams)
    } catch (err) {
      console.error(err)
    }
  }
  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(tasks.filter(t => t.id !== taskId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '220%',
      backgroundColor: '#ffebee',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#c62828', marginBottom: '20px' }}>All Tasks</h2>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <TaskSearchFilter onFilterChange={handleFilterChange} />

        {tasks.length === 0 && (
          <p style={{ color: 'orange' }}>No tasks found.</p>
        )}
        
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {tasks.map(task => {
            const editing = (editId === task.id)
            return (
              <li 
                key={task.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }}
              >
                <div style={{ marginBottom: '6px' }}>
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task)}
                    style={{ marginRight: '8px' }}
                  />
                  {!editing ? (
                    <strong style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: '#ad1457'
                    }}>
                      {task.title}
                    </strong>
                  ) : (
                    <input
                      type="text"
                      value={editFields.title}
                      onChange={e => handleEditFieldChange('title', e.target.value)}
                      style={{
                        fontWeight: 'bold',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                </div>

                {!editing ? (
                  <div style={{ fontSize: '0.9rem', color: '#6a1b9a' }}>
                    {task.description && <p>{task.description}</p>}
                    <p>
                      Priority: {task.priority} | Status: {task.status}
                      {task.dueDate && <> | Due: {task.dueDate}</>}
                      {task.category && <> | Category: {task.category}</>}
                    </p>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.9rem', color: '#6a1b9a' }}>
                    <div style={{ marginBottom: '6px' }}>
                      <label>Description: </label>
                      <input
                        type="text"
                        value={editFields.description}
                        onChange={e => handleEditFieldChange('description', e.target.value)}
                      />
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <label>Priority: </label>
                      <select
                        value={editFields.priority}
                        onChange={e => handleEditFieldChange('priority', e.target.value)}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <label>Status: </label>
                      <select
                        value={editFields.status}
                        onChange={e => handleEditFieldChange('status', e.target.value)}
                      >
                        <option>New</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <label>Due Date: </label>
                      <input
                        type="date"
                        value={editFields.dueDate}
                        onChange={e => handleEditFieldChange('dueDate', e.target.value)}
                      />
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <label>Category: </label>
                      <input
                        type="text"
                        value={editFields.category}
                        onChange={e => handleEditFieldChange('category', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '6px' }}>
                  {!editing ? (
                    <>
                      <button 
                        onClick={() => handleEdit(task)}
                        style={{
                          marginRight: '8px',
                          backgroundColor: '#ab47bc',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        style={{
                          backgroundColor: '#e53935',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSaveEdit(task.id)}
                        style={{
                          marginRight: '8px',
                          backgroundColor: '#66bb6a',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          backgroundColor: '#bdbdbd',
                          color: '#000',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AllTasks